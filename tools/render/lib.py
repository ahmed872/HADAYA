import bpy, bmesh, math, os
from mathutils import Vector

TEX = os.path.join(os.path.dirname(__file__), 'tex')
OUT = os.path.join(os.path.dirname(__file__), 'out')


def srgb(h):
    h = h.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4) for x in c) + (1.0,)


def reset(res=(1200, 1500), samples=128, look='AgX - Medium High Contrast'):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = samples
    sc.cycles.use_adaptive_sampling = True
    sc.cycles.adaptive_threshold = 0.015
    sc.cycles.use_denoising = True
    sc.cycles.max_bounces = 10
    sc.cycles.transmission_bounces = 12
    sc.cycles.glossy_bounces = 6
    sc.cycles.transparent_max_bounces = 12
    sc.cycles.caustics_reflective = False
    sc.cycles.caustics_refractive = False
    sc.cycles.blur_glossy = 1.0
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.render.resolution_percentage = int(os.environ.get('PCT', '100'))
    if os.environ.get('QUICK'): sc.cycles.samples = 40
    elif os.environ.get('SAMPLES'): sc.cycles.samples = int(os.environ['SAMPLES'])
    sc.render.image_settings.file_format = 'PNG'
    sc.render.image_settings.color_depth = '8'
    sc.view_settings.view_transform = 'AgX'
    try:
        sc.view_settings.look = look
    except Exception:
        pass
    w = bpy.data.worlds.new('W')
    sc.world = w
    w.use_nodes = True
    bg = w.node_tree.nodes['Background']
    bg.inputs[0].default_value = (0.02, 0.022, 0.026, 1)
    bg.inputs[1].default_value = 1.0
    return sc


def world(color, strength=1.0):
    bg = bpy.context.scene.world.node_tree.nodes['Background']
    bg.inputs[0].default_value = color if len(color) == 4 else color + (1,)
    bg.inputs[1].default_value = strength


# ---------------- materials ----------------
def _mat(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    return m, nt, nt.nodes['Principled BSDF']


def set_in(p, name, v):
    if name in p.inputs:
        p.inputs[name].default_value = v


def mat_basic(name, color, rough=0.5, metal=0.0, coat=0.0, coat_rough=0.05, spec=0.5):
    m, nt, p = _mat(name)
    set_in(p, 'Base Color', color)
    set_in(p, 'Roughness', rough)
    set_in(p, 'Metallic', metal)
    set_in(p, 'Coat Weight', coat)
    set_in(p, 'Coat Roughness', coat_rough)
    set_in(p, 'Specular IOR Level', spec)
    return m


def mat_gold(name='Gold', rough=0.2, brushed=True, color=None):
    m, nt, p = _mat(name)
    set_in(p, 'Base Color', color or (1.0, 0.60, 0.24, 1))
    set_in(p, 'Metallic', 1.0)
    set_in(p, 'Roughness', rough)
    if brushed:
        set_in(p, 'Anisotropic', 0.6)
        tc = nt.nodes.new('ShaderNodeTexCoord')
        mp = nt.nodes.new('ShaderNodeMapping')
        mp.inputs['Scale'].default_value = (3, 900, 3)
        nz = nt.nodes.new('ShaderNodeTexNoise')
        nz.inputs['Scale'].default_value = 4
        nz.inputs['Detail'].default_value = 8
        bump = nt.nodes.new('ShaderNodeBump')
        bump.inputs['Strength'].default_value = 0.04
        nt.links.new(tc.outputs['Object'], mp.inputs[0])
        nt.links.new(mp.outputs[0], nz.inputs[0])
        nt.links.new(nz.outputs[0], bump.inputs['Height'])
        nt.links.new(bump.outputs[0], p.inputs['Normal'])
    return m


def mat_wood(name='Walnut', dark=False, scale=1.0, coat=0.7, rot=0.0):
    m, nt, p = _mat(name)
    tc = nt.nodes.new('ShaderNodeTexCoord')
    mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Rotation'].default_value = (0, 0, rot)
    mp.inputs['Scale'].default_value = (150 * scale, 5 * scale, 150 * scale)
    nt.links.new(tc.outputs['Object'], mp.inputs[0])
    n1 = nt.nodes.new('ShaderNodeTexNoise')
    n1.inputs['Scale'].default_value = 1.0
    n1.inputs['Detail'].default_value = 10
    n1.inputs['Roughness'].default_value = 0.62
    n1.inputs['Distortion'].default_value = 3.0
    nt.links.new(mp.outputs[0], n1.inputs[0])
    wave = nt.nodes.new('ShaderNodeTexWave')
    wave.wave_type = 'BANDS'; wave.bands_direction = 'X'
    wave.inputs['Scale'].default_value = 0.08
    wave.inputs['Distortion'].default_value = 30.0
    wave.inputs['Detail'].default_value = 6
    wave.inputs['Detail Scale'].default_value = 0.6
    nt.links.new(mp.outputs[0], wave.inputs['Vector'])
    mixf = nt.nodes.new('ShaderNodeMix'); mixf.data_type = 'FLOAT'
    mixf.inputs['Factor'].default_value = 0.35
    nt.links.new(n1.outputs['Fac'], mixf.inputs[2]); nt.links.new(wave.outputs['Fac'], mixf.inputs[3])
    ramp = nt.nodes.new('ShaderNodeValToRGB')
    cr = ramp.color_ramp
    cols = ['#120a06', '#24150c', '#3a2416'] if dark else ['#24160e', '#3f2718', '#5a3a24']
    cr.elements[0].position = 0.35; cr.elements[0].color = srgb(cols[0])
    cr.elements[1].position = 0.68; cr.elements[1].color = srgb(cols[2])
    e = cr.elements.new(0.5); e.color = srgb(cols[1])
    nt.links.new(mixf.outputs[0], ramp.inputs[0])
    nt.links.new(ramp.outputs[0], p.inputs['Base Color'])
    set_in(p, 'Roughness', 0.38)
    set_in(p, 'Coat Weight', coat)
    set_in(p, 'Coat Roughness', 0.05)
    bump = nt.nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = 0.05
    nt.links.new(mixf.outputs[0], bump.inputs['Height'])
    nt.links.new(bump.outputs[0], p.inputs['Normal'])
    return m


def mat_glass(name='Crystal', ior=1.52, tint=(1, 1, 1, 1), rough=0.0):
    m, nt, p = _mat(name)
    set_in(p, 'Base Color', tint)
    set_in(p, 'Transmission Weight', 1.0)
    set_in(p, 'IOR', ior)
    set_in(p, 'Roughness', rough)
    # nicer shadows: shadow rays see transparent
    out = nt.nodes['Material Output']
    lp = nt.nodes.new('ShaderNodeLightPath')
    tr = nt.nodes.new('ShaderNodeBsdfTransparent')
    tr.inputs[0].default_value = (0.92, 0.94, 0.95, 1)
    mx = nt.nodes.new('ShaderNodeMixShader')
    nt.links.new(lp.outputs['Is Shadow Ray'], mx.inputs[0])
    nt.links.new(p.outputs[0], mx.inputs[1])
    nt.links.new(tr.outputs[0], mx.inputs[2])
    nt.links.new(mx.outputs[0], out.inputs[0])
    return m


def mat_decal(name, img, mode='dark', color=None, gold_rough=0.25):
    """Material for a plane carrying engraving mask image (white on transparent).
    mode: 'dark' (black infill), 'gold' (gold foil), 'frost' (frosted glass), 'color'"""
    m, nt, p = _mat(name)
    m.blend_method = 'HASHED' if hasattr(m, 'blend_method') else None
    tex = nt.nodes.new('ShaderNodeTexImage')
    tex.image = bpy.data.images.load(os.path.join(TEX, img + '.png'))
    tex.interpolation = 'Cubic'
    out = nt.nodes['Material Output']
    tr = nt.nodes.new('ShaderNodeBsdfTransparent')
    mx = nt.nodes.new('ShaderNodeMixShader')
    if mode == 'dark':
        set_in(p, 'Base Color', color or (0.012, 0.01, 0.009, 1))
        set_in(p, 'Roughness', 0.55)
    elif mode == 'gold':
        set_in(p, 'Base Color', color or (1.0, 0.60, 0.24, 1))
        set_in(p, 'Metallic', 1.0)
        set_in(p, 'Roughness', gold_rough)
    elif mode == 'frost':
        set_in(p, 'Base Color', (0.95, 0.96, 0.97, 1))
        set_in(p, 'Roughness', 0.5)
        set_in(p, 'Transmission Weight', 0.15)
        set_in(p, 'Subsurface Weight', 0.0)
    elif mode == 'color':
        set_in(p, 'Base Color', color)
        set_in(p, 'Roughness', 0.4)
    nt.links.new(tex.outputs['Alpha'], mx.inputs[0])
    nt.links.new(tr.outputs[0], mx.inputs[1])
    nt.links.new(p.outputs[0], mx.inputs[2])
    nt.links.new(mx.outputs[0], out.inputs[0])
    return m


# ---------------- geometry ----------------
def assign(ob, mat):
    ob.data.materials.clear()
    ob.data.materials.append(mat)
    return ob


def smooth(ob):
    for poly in ob.data.polygons:
        poly.use_smooth = True


def box(name, size, loc=(0, 0, 0), bevel=0.002, segs=4, mat=None, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    ob = bpy.context.active_object
    ob.name = name
    ob.scale = size
    bpy.ops.object.transform_apply(scale=True)
    if bevel:
        md = ob.modifiers.new('bev', 'BEVEL')
        md.width = bevel
        md.segments = segs
        md.limit_method = 'ANGLE'
        smooth(ob)
        try:
            ob.data.set_sharp_from_angle(angle=math.radians(40))
        except Exception:
            pass
    if mat:
        assign(ob, mat)
    return ob


def cyl(name, r, h, loc=(0, 0, 0), verts=96, bevel=0.0015, mat=None, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=h, location=loc, rotation=rot)
    ob = bpy.context.active_object
    ob.name = name
    if bevel:
        md = ob.modifiers.new('bev', 'BEVEL')
        md.width = bevel
        md.segments = 3
        md.limit_method = 'ANGLE'
    smooth(ob)
    try:
        ob.data.set_sharp_from_angle(angle=math.radians(40))
    except Exception:
        pass
    if mat:
        assign(ob, mat)
    return ob


def outline_solid(name, pts2d, thick, loc=(0, 0, 0), rot=(math.pi / 2, 0, 0), bevel=0.002, segs=4, mat=None, chamfer=False):
    """Extrude a 2D outline (x,y in metres; y up) into a solid of given thickness.
    Default rotation stands it upright facing -Y (camera)."""
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    vs = [bm.verts.new((x, y, 0)) for x, y in pts2d]
    f = bm.faces.new(vs)
    bmesh.ops.recalc_face_normals(bm, faces=[f])
    r = bmesh.ops.extrude_face_region(bm, geom=[f])
    nv = [g for g in r['geom'] if isinstance(g, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, vec=(0, 0, thick), verts=nv)
    bmesh.ops.translate(bm, vec=(0, 0, -thick / 2), verts=bm.verts[:])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    ob.location = loc
    ob.rotation_euler = rot
    if bevel:
        md = ob.modifiers.new('bev', 'BEVEL')
        md.width = bevel
        md.segments = 1 if chamfer else segs
        md.limit_method = 'ANGLE'
        md.angle_limit = math.radians(30)
        md.harden_normals = False
    if not chamfer:
        smooth(ob)
        try:
            ob.data.set_sharp_from_angle(angle=math.radians(35))
        except Exception:
            pass
    if mat:
        assign(ob, mat)
    return ob


def arch_pts(w, h, n=40):
    """outline: rectangle w x h with semicircular top (total height h), base at y=0"""
    r = w / 2
    pts = [(-r, 0), (r, 0), (r, h - r)]
    for i in range(1, n):
        a = i * math.pi / n
        pts.append((r * math.cos(a), h - r + r * math.sin(a)))
    pts.append((-r, h - r))
    return pts


def rrect_pts(w, h, rad, n=8, base=0.0):
    pts = []
    cs = [(w / 2 - rad, h - rad, 0), (-w / 2 + rad, h - rad, 90), (-w / 2 + rad, rad, 180), (w / 2 - rad, rad, 270)]
    for cx, cy, a0 in cs:
        for i in range(n + 1):
            a = math.radians(a0 + 90 * i / n)
            pts.append((cx + rad * math.cos(a), cy + rad * math.sin(a) + base))
    return pts


def circle_pts(r, n=96, cy=0):
    return [(r * math.cos(2 * math.pi * i / n), cy + r * math.sin(2 * math.pi * i / n)) for i in range(n)]


def decal(name, img, w, h, loc, rot=(math.pi / 2, 0, 0), mode='dark', color=None, gold_rough=0.25, flip=False):
    """plane facing -Y by default (rot x=90deg makes +Z normal point to -Y)"""
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc, rotation=rot)
    ob = bpy.context.active_object
    ob.name = name
    ob.scale = (-w if flip else w, h, 1)
    bpy.ops.object.transform_apply(scale=True)
    assign(ob, mat_decal(name + 'M', img, mode, color, gold_rough))
    # plane primitive faces +Z; after rot x=90 its normal is -Y. UV: flip to face camera properly
    return ob


def lathe(name, profile, steps=128, loc=(0, 0, 0), mat=None, subsurf=1):
    """profile: list of (r, z). revolve around Z"""
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    vs = [bm.verts.new((r, 0, z)) for r, z in profile]
    for a, b in zip(vs, vs[1:]):
        bm.edges.new((a, b))
    bmesh.ops.spin(bm, geom=bm.verts[:] + bm.edges[:], cent=(0, 0, 0), axis=(0, 0, 1), angle=2 * math.pi, steps=steps, use_merge=True)
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=1e-6)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(ob)
    ob.location = loc
    if subsurf:
        md = ob.modifiers.new('sub', 'SUBSURF')
        md.levels = subsurf
        md.render_levels = subsurf
    smooth(ob)
    if mat:
        assign(ob, mat)
    return ob


def tube_curve(name, pts, radius, mat=None, loc=(0, 0, 0)):
    cu = bpy.data.curves.new(name, 'CURVE')
    cu.dimensions = '3D'
    cu.bevel_depth = radius
    cu.bevel_resolution = 6
    sp = cu.splines.new('BEZIER')
    sp.bezier_points.add(len(pts) - 1)
    for bp, p in zip(sp.bezier_points, pts):
        bp.co = p
        bp.handle_left_type = bp.handle_right_type = 'AUTO'
    cu.use_fill_caps = True
    ob = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(ob)
    ob.location = loc
    if mat:
        cu.materials.append(mat)
    return ob


# ---------------- stage ----------------
def sweep(color_hex, rough=0.65, width=8, depth=6, height=4, radius=1.2, mat=None, y0=-3):
    """cyclorama: floor from y0 back to y=depth-radius, curves up to height"""
    me = bpy.data.meshes.new('sweep')
    bm = bmesh.new()
    prof = [(y0, 0.0)]
    yc = depth - radius
    prof.append((yc, 0.0))
    for i in range(1, 17):
        a = i * (math.pi / 2) / 16
        prof.append((yc + radius * math.sin(a), radius - radius * math.cos(a)))
    prof.append((depth, height))
    left = [bm.verts.new((-width / 2, y, z)) for y, z in prof]
    right = [bm.verts.new((width / 2, y, z)) for y, z in prof]
    for i in range(len(prof) - 1):
        bm.faces.new((left[i], right[i], right[i + 1], left[i + 1]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new('sweep', me)
    bpy.context.collection.objects.link(ob)
    smooth(ob)
    assign(ob, mat or mat_basic('bg', srgb(color_hex), rough=rough))
    # ensure normals point up
    return ob


def area(name, loc, target, size=(1, 1), power=200, color=(1, 1, 1), spread=180, visible=True):
    ld = bpy.data.lights.new(name, 'AREA')
    ld.shape = 'RECTANGLE'
    ld.size, ld.size_y = size
    ld.energy = power
    ld.color = color
    ld.spread = math.radians(spread)
    ob = bpy.data.objects.new(name, ld)
    bpy.context.collection.objects.link(ob)
    ob.location = loc
    look_at(ob, target)
    ob.visible_camera = False
    return ob


def look_at(ob, target):
    d = Vector(target) - Vector(ob.location)
    ob.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()


def camera(loc, target, lens=85, fstop=None, focus=None, shift=(0, 0)):
    cd = bpy.data.cameras.new('cam')
    cd.lens = lens
    cd.shift_x, cd.shift_y = shift
    ob = bpy.data.objects.new('cam', cd)
    bpy.context.collection.objects.link(ob)
    ob.location = loc
    look_at(ob, target)
    if fstop:
        cd.dof.use_dof = True
        cd.dof.aperture_fstop = fstop
        cd.dof.focus_distance = focus or (Vector(target) - Vector(loc)).length
    bpy.context.scene.camera = ob
    return ob


def studio_light(scene_scale=1.0, warm=True, key=1.0, rim=1.0):
    s = scene_scale
    kc = (1.0, 0.95, 0.88) if warm else (1, 1, 1)
    area('key', (-1.2 * s, -1.2 * s, 1.4 * s), (0, 0, 0.2 * s), (0.9 * s, 1.4 * s), 115 * key * s * s, kc)
    area('bgl', (0, 0.4 * s, 0.6 * s), (0, 3.0 * s, 1.4 * s), (2.5 * s, 1.0 * s), 140 * s * s, kc)
    area('fill', (1.4 * s, -1.1 * s, 0.5 * s), (0, 0, 0.2 * s), (1.2 * s, 1.2 * s), 30 * s * s, (0.95, 0.97, 1.0))
    area('rim', (0.8 * s, 1.1 * s, 1.3 * s), (0, 0, 0.25 * s), (1.4 * s, 0.35 * s), 200 * rim * s * s, kc)
    area('top', (0.2 * s, -0.5 * s, 2.0 * s), (0, 0, 0), (1.6 * s, 0.35 * s), 60 * s * s, kc)


def render(name):
    sc = bpy.context.scene
    sc.render.filepath = os.path.join(OUT, name + '.png')
    bpy.ops.render.render(write_still=True)
    print('RENDERED', name)
