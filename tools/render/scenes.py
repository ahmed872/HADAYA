import sys, math, os, time
sys.path.insert(0, os.path.dirname(__file__))
from lib import *
import bpy
from mathutils import Vector

PI = math.pi
STONE = '#c9bfae'
NAVY = '#101C2C'


def group(objs, loc=(0, 0, 0), rot=(0, 0, 0), name='grp'):
    e = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(e)
    for o in objs:
        o.parent = e
    e.location = loc
    e.rotation_euler = rot
    return e


# ---------------- product builders (all stand on z=0, face -Y) ----------------
def wood_gold_plaque(x=0, y=0, rz=0, tilt=-0.10, s=1.0):
    W, H, T = 0.24 * s, 0.30 * s, 0.022 * s
    parts = []
    wood = mat_wood('walnut', scale=1 / s)
    pl = outline_solid('plaque', rrect_pts(W, H, 0.012 * s), T, loc=(0, 0, 0.012 * s), bevel=0.004 * s, mat=wood)
    parts.append(pl)
    gold = mat_gold('plategold')
    pw, ph = 0.18 * s, 0.135 * s
    plate = outline_solid('plate', rrect_pts(pw, ph, 0.004 * s), 0.0015 * s, loc=(0, -T / 2 - 0.0008 * s, 0.012 * s + H / 2 - ph / 2 - 0.02 * s), bevel=0.0006 * s, segs=2, mat=gold)
    parts.append(plate)
    parts.append(decal('eng', 'plate_classic', pw * 0.97, ph * 0.97, (0, -T / 2 - 0.0017 * s, 0.012 * s + H / 2 - 0.02 * s)))
    # gold top emblem
    parts.append(decal('emb', 'star', 0.05 * s, 0.05 * s, (0, -T / 2 - 0.0004 * s, 0.012 * s + H - 0.045 * s), mode='gold'))
    # small base
    base = box('base', (W * 0.9, 0.07 * s, 0.014 * s), loc=(0, 0.01 * s, 0.007 * s), bevel=0.003 * s, mat=mat_wood('walnut2', dark=True, scale=1 / s))
    g = group(parts, loc=(0, 0, 0), rot=(tilt, 0, 0))
    g.location = (0, 0, 0.0)
    return group([g, base], loc=(x, y, 0), rot=(0, 0, rz))


def acrylic_award(x=0, y=0, rz=0, s=1.0):
    W, H, T = 0.17 * s, 0.27 * s, 0.02 * s
    glass = mat_glass('acrylic', ior=1.49, tint=(0.97, 0.99, 1.0, 1))
    ac = outline_solid('acr', arch_pts(W, H), T, loc=(0, 0, 0.04 * s), bevel=0.0035 * s, segs=1, mat=glass, chamfer=True)
    eng = decal('acreng', 'acrylic', W * 0.82, H * 0.78, (0, 0.0, 0.04 * s + H * 0.48), mode='frost')
    base = box('acrbase', (W * 1.15, 0.075 * s, 0.04 * s), loc=(0, 0, 0.02 * s), bevel=0.003 * s, mat=mat_wood('walnutA', dark=True, scale=1 / s))
    ring = box('acrgold', (W * 1.152, 0.0752 * s, 0.004 * s), loc=(0, 0, 0.033 * s), bevel=0.0008, segs=2, mat=mat_gold('ag', brushed=False, rough=0.15))
    return group([ac, eng, base, ring], loc=(x, y, 0), rot=(0, 0, rz))


def crystal_award(x=0, y=0, rz=0, s=1.0):
    W, T = 0.10 * s, 0.045 * s
    pts = [(-W / 2, 0), (W / 2, 0), (W / 2, 0.25 * s), (0.0, 0.32 * s), (-W / 2, 0.27 * s)]
    cr = outline_solid('crys', pts, T, loc=(0, 0, 0.05 * s), bevel=0.006 * s, chamfer=True, mat=mat_glass('crystal', ior=1.55))
    eng = decal('creng', 'crystal', W * 0.85, 0.17 * s, (0, 0, 0.05 * s + 0.135 * s), mode='frost')
    bmat = mat_glass('blackglass', ior=1.5, tint=(0.02, 0.025, 0.035, 1))
    base = box('cbase', (0.13 * s, 0.085 * s, 0.05 * s), loc=(0, 0, 0.025 * s), bevel=0.006 * s, segs=1, mat=bmat)
    return group([cr, eng, base], loc=(x, y, 0), rot=(0, 0, rz))


def gold_cup(x=0, y=0, rz=0, s=1.0):
    prof = [(0.0, 0.0), (0.06, 0.0), (0.06, 0.012), (0.055, 0.016), (0.03, 0.02), (0.018, 0.04), (0.014, 0.07), (0.022, 0.085),
            (0.014, 0.095), (0.02, 0.105), (0.045, 0.12), (0.07, 0.16), (0.082, 0.21), (0.086, 0.245), (0.088, 0.25), (0.082, 0.25), (0.078, 0.24), (0.0, 0.24)]
    prof = [(r * s, z * s) for r, z in prof]
    cup = lathe('cup', prof, loc=(0, 0, 0.07 * s), mat=mat_gold('cupgold', rough=0.14, brushed=False, color=(0.95, 0.68, 0.28, 1)))
    hm = mat_gold('handle', rough=0.14, brushed=False, color=(0.95, 0.68, 0.28, 1))
    hs = []
    for side in (-1, 1):
        pts = [(side * 0.075 * s, 0, 0.29 * s), (side * 0.13 * s, 0, 0.29 * s), (side * 0.13 * s, 0, 0.22 * s), (side * 0.065 * s, 0, 0.19 * s)]
        hs.append(tube_curve('h', pts, 0.0085 * s, mat=hm))
    base = lathe('cb', [(0, 0), (0.085 * s, 0), (0.085 * s, 0.05 * s), (0.07 * s, 0.07 * s), (0, 0.07 * s)], steps=4, subsurf=0,
                 mat=mat_basic('blackmarble', srgb('#0c0c0e'), rough=0.08, coat=1.0))
    base.rotation_euler = (0, 0, PI / 4)
    plate = decal('cupplate', 'cup_plate', 0.07 * s, 0.025 * s, (0, -0.0605 * s, 0.03 * s), mode='gold', gold_rough=0.2)
    return group([cup, base, plate] + hs, loc=(x, y, 0), rot=(0, 0, rz))


def gift_box(x=0, y=0, rz=0, s=1.0, color='#14223a', open_lid=True):
    navy = mat_basic('boxnavy', srgb(color), rough=0.55, coat=0.15)
    W, D, H = 0.30 * s, 0.22 * s, 0.07 * s
    objs = []
    objs.append(box('boxbase', (W, D, H), loc=(0, 0, H / 2), bevel=0.0015 * s, mat=navy))
    # inner lining
    objs.append(box('lining', (W - 0.012 * s, D - 0.012 * s, 0.002), loc=(0, 0, H - 0.001), bevel=0, mat=mat_basic('lin', srgb('#e8dfcf'), rough=0.9)))
    # notebook
    nb = box('notebook', (0.14 * s, 0.19 * s, 0.018 * s), loc=(-0.06 * s, 0, H + 0.009 * s), bevel=0.003 * s, mat=mat_basic('leather', srgb('#1b2a44'), rough=0.6))
    objs.append(nb)
    objs.append(decal('nblogo', 'logo', 0.05 * s, 0.05 * s, (-0.06 * s, 0.02 * s, H + 0.0182 * s), rot=(0, 0, 0), mode='gold'))
    objs.append(box('band', (0.006 * s, 0.191 * s, 0.0185 * s), loc=(-0.005 * s, 0, H + 0.009 * s), bevel=0.001, mat=mat_basic('elastic', srgb('#c5a15a'), rough=0.5)))
    # pen
    pen = cyl('pen', 0.0055 * s, 0.14 * s, loc=(0.06 * s, 0, H + 0.006 * s), rot=(PI / 2, 0, 0), mat=mat_basic('penlac', srgb('#0d1626'), rough=0.08, coat=1))
    objs.append(pen)
    objs.append(cyl('pentrim', 0.0057 * s, 0.012 * s, loc=(0.06 * s, 0.02 * s, H + 0.006 * s), rot=(PI / 2, 0, 0), mat=mat_gold('pg', brushed=False, rough=0.15)))
    objs.append(box('clip', (0.002 * s, 0.05 * s, 0.002 * s), loc=(0.06 * s, 0.045 * s, H + 0.0125 * s), bevel=0.0007, mat=mat_gold('pc', brushed=False, rough=0.15)))
    # card
    objs.append(box('card', (0.06 * s, 0.09 * s, 0.0015), loc=(0.11 * s, -0.02 * s, H + 0.001), bevel=0.0003, mat=mat_basic('card', srgb('#f4efe6'), rough=0.8)))
    objs.append(decal('cardlogo', 'logo', 0.025 * s, 0.025 * s, (0.11 * s, -0.005 * s, H + 0.0019), rot=(0, 0, 0), mode='gold'))
    # lid leaning behind
    if open_lid:
        lid = box('lid', (W + 0.004 * s, D + 0.004 * s, 0.03 * s), loc=(0, 0, 0), bevel=0.0015 * s, mat=navy)
        lidlogo = decal('lidlogo', 'logo', 0.075 * s, 0.075 * s, (0, 0, 0.0152 * s), rot=(0, 0, 0), mode='gold', flip=True)
        lg = group([lid, lidlogo], loc=(0, D / 2 + 0.04 * s, D / 2 + 0.03 * s), rot=(-PI / 2 + 0.28, 0, PI), name='lidg')
        objs.append(lg)
    return group(objs, loc=(x, y, 0), rot=(0, 0, rz))


def employee_plaque(x=0, y=0, rz=0, s=1.0, tilt=-0.1):
    W, H, T = 0.32 * s, 0.22 * s, 0.022 * s
    wood = mat_wood('walnutE', dark=True, scale=1 / s, rot=PI / 2)
    pl = outline_solid('eplaque', rrect_pts(W, H, 0.008 * s), T, loc=(0, 0, 0.012 * s), bevel=0.004 * s, mat=wood)
    navy = mat_basic('enavy', srgb('#13213a'), rough=0.3, coat=0.6)
    inner = outline_solid('einner', rrect_pts(W - 0.03 * s, H - 0.03 * s, 0.004 * s), 0.002 * s, loc=(0, -T / 2 - 0.001 * s, 0.012 * s + 0.015 * s), bevel=0.0007, segs=2, mat=navy)
    eng = decal('eeng', 'employee', (W - 0.05 * s), (H - 0.05 * s) * 0.98, (0, -T / 2 - 0.0022 * s, 0.012 * s + H / 2), mode='gold', gold_rough=0.18)
    base = box('ebase', (W * 0.7, 0.07 * s, 0.014 * s), loc=(0, 0.012 * s, 0.007 * s), bevel=0.003 * s, mat=mat_wood('walnutE2', dark=True, scale=1 / s))
    g = group([pl, inner, eng], rot=(tilt, 0, 0))
    return group([g, base], loc=(x, y, 0), rot=(0, 0, rz))


def islamic_plaque(x=0, y=0, rz=0, s=1.0, tilt=-0.1):
    W, H, T = 0.27 * s, 0.27 * s, 0.024 * s
    wood = mat_wood('walnutI', dark=True, scale=1 / s)
    pl = outline_solid('iplaque', rrect_pts(W, H, 0.006 * s), T, loc=(0, 0, 0.012 * s), bevel=0.004 * s, mat=wood)
    navy = mat_basic('inavy', srgb('#101c2c'), rough=0.35, coat=0.5)
    inner = outline_solid('iinner', rrect_pts(W - 0.026 * s, H - 0.026 * s, 0.003 * s), 0.002 * s, loc=(0, -T / 2 - 0.001 * s, 0.012 * s + 0.013 * s), bevel=0.0006, segs=2, mat=navy)
    pat = decal('ipat', 'islamic_pattern', W - 0.036 * s, H - 0.036 * s, (0, -T / 2 - 0.0021 * s, 0.012 * s + H / 2), mode='gold', gold_rough=0.22)
    med = decal('imed', 'islamic', W - 0.036 * s, H - 0.036 * s, (0, -T / 2 - 0.0023 * s, 0.012 * s + H / 2), mode='gold', gold_rough=0.15)
    base = box('ibase', (W * 0.8, 0.07 * s, 0.014 * s), loc=(0, 0.012 * s, 0.007 * s), bevel=0.003 * s, mat=mat_wood('walnutI2', dark=True, scale=1 / s))
    g = group([pl, inner, pat, med], rot=(tilt, 0, 0))
    return group([g, base], loc=(x, y, 0), rot=(0, 0, rz))


def medal_plaque(x=0, y=0, rz=0, s=1.0, tilt=-0.1):
    """walnut shield with round gold medal and navy field"""
    W, H, T = 0.24 * s, 0.30 * s, 0.024 * s
    wood = mat_wood('walnutM', scale=1 / s)
    shield = [(-W / 2, H * 0.92), (W / 2, H * 0.92), (W / 2, H * 0.45), (W * 0.32, H * 0.18), (0, 0.0), (-W * 0.32, H * 0.18), (-W / 2, H * 0.45)]
    # add a small arch at the top
    top = [(W / 2 * math.cos(a), H * 0.92 + 0.035 * s * math.sin(a)) for a in [i * PI / 20 for i in range(1, 20)]]
    pts = [(-W / 2, H * 0.92)] + [(-W / 2, H * 0.45), (-W * 0.32, H * 0.18), (0, 0.0), (W * 0.32, H * 0.18), (W / 2, H * 0.45), (W / 2, H * 0.92)] + top
    sh = outline_solid('shield', pts, T, loc=(0, 0, 0.012 * s), bevel=0.004 * s, mat=wood)
    navy = mat_basic('mnavy', srgb('#121f34'), rough=0.6)
    inset = [(x_ * 0.86, y_ * 0.86 + 0.03 * s) for x_, y_ in pts]
    field = outline_solid('field', inset, 0.002 * s, loc=(0, -T / 2 - 0.001 * s, 0.012 * s), bevel=0.0006, segs=2, mat=navy)
    md = cyl('medal', 0.068 * s, 0.006 * s, loc=(0, -T / 2 - 0.005 * s, 0.012 * s + H * 0.56), rot=(PI / 2, 0, 0), bevel=0.0015 * s, mat=mat_gold('mg', rough=0.18, brushed=False))
    eng = decal('meng', 'medal', 0.13 * s, 0.13 * s, (0, -T / 2 - 0.0081 * s, 0.012 * s + H * 0.56), mode='dark', color=(0.25, 0.15, 0.04, 1))
    eng2 = decal('mtext', 'commem', 0.12 * s, 0.069 * s, (0, -T / 2 - 0.0022 * s, 0.012 * s + H * 0.25), mode='gold', gold_rough=0.2)
    base = box('mbase', (W * 0.8, 0.07 * s, 0.014 * s), loc=(0, 0.012 * s, 0.007 * s), bevel=0.003 * s, mat=mat_wood('walnutM2', dark=True, scale=1 / s))
    g = group([sh, field, md, eng, eng2], rot=(tilt, 0, 0))
    return group([g, base], loc=(x, y, 0), rot=(0, 0, rz))


def glass_thanks(x=0, y=0, rz=0, s=1.0, tilt=-0.08):
    """black glass plaque with gold frame and medallion print"""
    W, H, T = 0.25 * s, 0.25 * s, 0.012 * s
    bg = mat_basic('blackglass2', srgb('#0b1220'), rough=0.03, coat=1.0, spec=0.7)
    pl = outline_solid('gp', rrect_pts(W, H, 0.004 * s), T, loc=(0, 0, 0.03 * s), bevel=0.002 * s, segs=2, mat=bg)
    fr = decal('gframe', 'medallion', W * 0.86, H * 0.86, (0, -T / 2 - 0.0003 * s, 0.03 * s + H / 2), mode='gold', gold_rough=0.12)
    base = box('gbase', (W * 1.05, 0.08 * s, 0.03 * s), loc=(0, 0.01 * s, 0.015 * s), bevel=0.003 * s, mat=mat_gold('gb', rough=0.22))
    g = group([pl, fr], rot=(tilt, 0, 0))
    return group([g, base], loc=(x, y, 0), rot=(0, 0, rz))


def commem_arch(x=0, y=0, rz=0, s=1.0, tilt=-0.06):
    """walnut arch with gold laurel and text"""
    W, H, T = 0.2 * s, 0.3 * s, 0.025 * s
    wood = mat_wood('walnutC', scale=1 / s)
    ar = outline_solid('arch', arch_pts(W, H), T, loc=(0, 0, 0.03 * s), bevel=0.005 * s, mat=wood)
    gold = mat_gold('archgold', rough=0.14, brushed=False)
    inner = outline_solid('ainner', arch_pts(W * 0.78, H * 0.84), 0.003 * s, loc=(0, -T / 2 - 0.0015 * s, 0.03 * s + H * 0.08), bevel=0.0008, segs=2, mat=gold)
    navyp = outline_solid('anavy', arch_pts(W * 0.72, H * 0.80), 0.002 * s, loc=(0, -T / 2 - 0.0032 * s, 0.03 * s + H * 0.1), bevel=0.0005, segs=2, mat=mat_basic('an', srgb('#101c2c'), rough=0.4, coat=0.5))
    lau = decal('alaurel', 'crystal', W * 0.6, W * 1.2, (0, -T / 2 - 0.0044 * s, 0.03 * s + H * 0.56), mode='gold', gold_rough=0.15)
    base = box('abase', (W * 1.2, 0.08 * s, 0.03 * s), loc=(0, 0, 0.015 * s), bevel=0.004 * s, mat=mat_wood('walnutC2', dark=True, scale=1 / s))
    g = group([ar, inner, navyp, lau], rot=(tilt, 0, 0))
    return group([g, base], loc=(x, y, 0), rot=(0, 0, rz))


# ---------------- stages ----------------
def stage_catalog(target=(0, 0, 0.16), dist=1.35, height=0.42, lens=85, res=(1000, 1250), samples=128, fstop=None):
    reset(res=res, samples=samples)
    sweep(STONE, rough=0.7)
    world(srgb('#c9c2b6')[:3], 0.12)
    studio_light(0.6)
    bpy.context.scene.view_settings.exposure = -0.35
    camera((-dist * 0.33, -dist * 0.94, height), target, lens=lens, fstop=fstop)


def stage_navy(target=(0, 0, 0.16), dist=1.35, height=0.42, lens=85, res=(1000, 1250), samples=128, fstop=None, rim=1.6):
    reset(res=res, samples=samples)
    sweep(NAVY, rough=0.55, mat=mat_basic('navybg', srgb('#0b1424'), rough=0.85, spec=0.12))
    world(srgb('#0a1220')[:3], 0.3)
    s = 0.6
    area('key', (-1.0 * s, -1.4 * s, 1.6 * s), (0, 0, 0.2 * s), (1.0 * s, 1.4 * s), 105 * s * s, (1.0, 0.93, 0.82))
    area('glow', (0, 4.6, 0.5), (0, 6.0, 1.6), (2.5, 1.0), 260, (0.55, 0.7, 1.0))
    area('rim', (0.9 * s, 1.0 * s, 1.0 * s), (0, 0, 0.25 * s), (0.5 * s, 1.6 * s), 260 * rim * s * s, (1.0, 0.85, 0.6))
    area('rim2', (-1.0 * s, 1.0 * s, 1.0 * s), (0, 0, 0.25 * s), (0.5 * s, 1.6 * s), 160 * rim * s * s, (0.8, 0.88, 1.0))
    area('top', (0, -0.3 * s, 2.0 * s), (0, 0, 0), (1.6 * s, 0.6 * s), 70 * s * s, (1, 0.95, 0.88))
    camera((0, -dist, height), target, lens=lens, fstop=fstop)


# ---------------- scenes ----------------
def scene(name):
    if name == 'p_wood':
        stage_catalog(); wood_gold_plaque()
    elif name == 'p_acrylic':
        stage_catalog(); acrylic_award()
    elif name == 'p_islamic':
        stage_catalog(); islamic_plaque()
    elif name == 'p_employee':
        stage_catalog(target=(0, 0, 0.13)); employee_plaque()
    elif name == 'p_crystal':
        stage_catalog(target=(0, 0, 0.18)); crystal_award()
    elif name == 'p_thanks':
        stage_catalog(); glass_thanks()
    elif name == 'p_giftbox':
        stage_catalog(target=(0, 0.02, 0.08), dist=1.2, height=0.75); gift_box(rz=0.0)
    elif name == 'p_commem':
        stage_catalog(target=(0, 0, 0.17)); commem_arch()
    elif name == 'p_medal':
        stage_catalog(); medal_plaque()
    elif name == 'p_cup':
        stage_catalog(target=(0, 0, 0.18)); gold_cup()
    # ---- category / editorial (navy) ----
    elif name == 'c_wood':
        stage_navy(target=(0.0, 0.05, 0.15), res=(1000, 1250)); wood_gold_plaque(x=0.07, y=0.12, rz=-0.25); employee_plaque(x=-0.06, y=-0.04, rz=0.2, s=0.8)
    elif name == 'c_crystal':
        stage_navy(target=(0, 0.05, 0.16), res=(1200, 1500), rim=2.2); crystal_award(x=-0.07, y=0.0, rz=0.25); acrylic_award(x=0.08, y=0.1, rz=-0.3)
    elif name == 'c_gifts':
        stage_navy(target=(0, 0.02, 0.06), dist=1.15, height=0.8, res=(1000, 1250)); gift_box(rz=0.3)
    elif name == 'c_cups':
        stage_navy(target=(0, 0.05, 0.18), res=(1000, 1250)); gold_cup(x=-0.05, rz=0.3); gold_cup(x=0.13, y=0.16, s=0.8, rz=-0.2)
    elif name == 'c_commem':
        stage_navy(target=(0, 0.05, 0.16), res=(1000, 1250)); medal_plaque(x=-0.07, rz=0.22); commem_arch(x=0.1, y=0.12, rz=-0.25, s=0.9)
    elif name == 'c_promo':
        promo_flatlay()
    elif name == 'hero':
        hero(wide=True)
    elif name == 'hero_m':
        hero(wide=False)
    # ---- portfolio ----
    elif name == 'g_macro':
        stage_catalog(target=(0.02, -0.03, 0.2), dist=0.42, height=0.27, lens=100, res=(1280, 960), fstop=2.2); wood_gold_plaque(tilt=-0.1)
        bpy.context.scene.camera.location.x = -0.12; look_at(bpy.context.scene.camera, (0.02, -0.03, 0.19))
    elif name == 'g_row':
        stage_navy(target=(0.0, 0.1, 0.16), dist=1.0, height=0.32, lens=70, res=(1280, 960), fstop=2.8, rim=2.0)
        for i in range(5):
            crystal_award(x=-0.28 + i * 0.15, y=0.05 + i * 0.12, rz=0.0)
        bpy.context.scene.camera.location.x = -0.35; look_at(bpy.context.scene.camera, (0.0, 0.2, 0.16))
        cam = bpy.context.scene.camera; cam.data.dof.focus_distance = (cam.location - Vector((-0.13, 0.17, 0.15))).length
    elif name == 'g_boxes':
        stage_catalog(target=(0, 0.0, 0.1), dist=1.3, height=0.9, res=(960, 1280))
        gift_box(x=-0.04, y=0.08, rz=0.4); gift_box(x=0.12, y=-0.16, rz=-0.2, color='#2a2219', open_lid=False, s=0.8)
    elif name == 'g_acrylic':
        stage_navy(target=(0, 0, 0.18), dist=0.9, height=0.3, res=(960, 1280), fstop=2.8, rim=2.5); acrylic_award(rz=-0.35)
    elif name == 'g_trio':
        stage_catalog(target=(0, 0.05, 0.15), dist=1.6, height=0.5, res=(1280, 960))
        wood_gold_plaque(x=-0.2, y=0.05, rz=0.2, s=0.8); islamic_plaque(x=0.02, y=0.12, s=0.9); employee_plaque(x=0.24, y=0.0, rz=-0.25, s=0.7)
    elif name == 'g_cup_plaque':
        stage_navy(target=(0, 0.05, 0.17), res=(960, 1280)); gold_cup(x=-0.06, y=0.1, rz=0.2); medal_plaque(x=0.1, y=-0.02, rz=-0.3, s=0.75)
    elif name == 'g_islamic':
        stage_navy(target=(0.0, 0, 0.15), dist=0.75, height=0.32, res=(960, 1280), fstop=3.5, lens=85); islamic_plaque(rz=0.35)
    elif name == 'g_thanks':
        stage_navy(target=(0, 0, 0.16), res=(960, 1280), rim=2); glass_thanks(rz=0.3)
    elif name == 'statement':
        stage_navy(target=(0.0, 0.1, 0.16), dist=1.1, height=0.3, lens=70, res=(2400, 1100), fstop=2.8, rim=2.4)
        islamic_plaque(x=-0.32, y=0.05, rz=0.35); crystal_award(x=-0.14, y=0.25, rz=0.2); gold_cup(x=0.34, y=0.35, rz=-0.2, s=0.9)
    elif name == 'tex_wood':
        reset(res=(1200, 1200), samples=32)
        bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0)); p = bpy.context.active_object; assign(p, mat_wood('wt', coat=0.0))
        world((1, 1, 1), 1.0); area('k', (0, 0, 2), (0, 0, 0), (3, 3), 45)
        c = camera((0, 0, 1), (0, 0, 0)); c.data.type = 'ORTHO'; c.data.ortho_scale = 0.3
        bpy.context.scene.view_settings.view_transform = 'Standard'
    elif name == 'test':
        stage_catalog(res=(480, 600), samples=48); wood_gold_plaque()
    render(name)


def promo_flatlay():
    reset(res=(1000, 1250), samples=128)
    bpy.ops.mesh.primitive_plane_add(size=3)
    assign(bpy.context.active_object, mat_basic('paper', srgb('#c4b8a3'), rough=0.85))
    world(srgb('#d8d0c2')[:3], 0.08)
    area('key', (-0.6, -0.2, 0.9), (0, 0, 0), (0.5, 0.5), 45, (1, 0.94, 0.86))
    area('fill', (0.6, 0.4, 1.0), (0, 0, 0), (1, 1), 10)
    bpy.context.scene.view_settings.exposure = -0.3
    # notebook
    box('nb', (0.16, 0.22, 0.016), loc=(-0.08, 0.05, 0.008), rot=(0, 0, 0.12), bevel=0.003, mat=mat_basic('nbl', srgb('#16243c'), rough=0.6))
    decal('nbl', 'logo', 0.06, 0.06, (-0.08, 0.07, 0.0162), rot=(0, 0, 0.12), mode='gold')
    # pen
    cyl('pen', 0.0055, 0.15, loc=(0.035, 0.02, 0.0055), rot=(PI / 2, 0, 0.12), mat=mat_basic('pl', srgb('#0d1626'), rough=0.08, coat=1))
    cyl('pent', 0.0057, 0.012, loc=(0.0326, 0.04, 0.0055), rot=(PI / 2, 0, 0.12), mat=mat_gold('pg', brushed=False, rough=0.15))
    # mug
    mug = cyl('mug', 0.042, 0.095, loc=(0.13, 0.13, 0.0475), mat=mat_basic('mug', srgb('#f2ede4'), rough=0.15, coat=0.6))
    tube_curve('mh', [(0.172, 0.13, 0.075), (0.2, 0.13, 0.07), (0.2, 0.13, 0.03), (0.172, 0.13, 0.025)], 0.006, mat=mat_basic('mh', srgb('#f2ede4'), rough=0.15))
    decal('mugin', 'logo', 0.06, 0.06, (0.13, 0.13, 0.0952), rot=(0, 0, 0), mode='color', color=srgb('#3a2a1a'))
    # thermos lying
    cyl('therm', 0.035, 0.24, loc=(0.0, -0.17, 0.035), rot=(0, PI / 2, -0.08), mat=mat_basic('th', srgb('#1a2740'), rough=0.35, coat=0.3))
    cyl('thcap', 0.0355, 0.04, loc=(-0.14, -0.16, 0.035), rot=(0, PI / 2, -0.08), mat=mat_gold('tc', brushed=True, rough=0.25))
    # keychain leather tag + ring
    box('tag', (0.035, 0.07, 0.004), loc=(0.16, -0.03, 0.002), rot=(0, 0, -0.5), bevel=0.0015, mat=mat_basic('tag', srgb('#7a4a2a'), rough=0.6))
    decal('tagl', 'star', 0.022, 0.022, (0.16, -0.03, 0.0042), rot=(0, 0, -0.5), mode='gold')
    lathe('ring', [(0.012 + 0.0015 * math.cos(a), 0.0015 * math.sin(a) + 0.0015) for a in [i * 2 * PI / 16 for i in range(17)]], steps=48, loc=(0.18, 0.012, 0), mat=mat_gold('rg', brushed=False, rough=0.15), subsurf=0)
    # cards
    box('card1', (0.09, 0.055, 0.0012), loc=(-0.17, -0.06, 0.0006), rot=(0, 0, -0.2), bevel=0.0003, mat=mat_basic('c1', srgb('#101c2c'), rough=0.7))
    decal('c1l', 'logo_text', 0.07, 0.03, (-0.17, -0.06, 0.0013), rot=(0, 0, -0.2), mode='gold')
    c = camera((0, 0, 0.78), (0, 0, 0), lens=50)
    c.rotation_euler = (0, 0, 0)


def hero(wide=True):
    if wide:
        stage_navy(target=(0.0, 0.14, 0.17), dist=1.95, height=0.42, lens=60, res=(2400, 1350), rim=2.0, samples=128)
    else:
        stage_navy(target=(0.02, 0.14, 0.17), dist=1.3, height=0.4, lens=60, res=(1080, 1350), rim=2.0, samples=128)
    # composition
    crystal_award(x=-0.02, y=0.12, rz=0.15, s=1.1)
    gold_cup(x=-0.25, y=0.32, rz=0.2, s=1.05)
    wood_gold_plaque(x=0.2, y=0.08, rz=-0.38, s=1.0)
    acrylic_award(x=0.42, y=0.5, rz=-0.5, s=0.95) if not wide else None
    if wide:
        cam = bpy.context.scene.camera
        cam.data.shift_x = 0.24


if __name__ == '__main__':
    for n in sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]:
        t = time.time()
        scene(n)
        print(n, 'took', round(time.time() - t, 1), 's', flush=True)
