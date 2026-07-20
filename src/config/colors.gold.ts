export const brand = {
    orange: '#E7B10A',
    orangeSecondary: '#C49508',
    orangeHover: '#D4A009',
    navy: '#4C4B16',
    navyLight: '#7b8c41',
} as const;

export const accent = {
    primary: '#E7B10A',
    shade50: '#FDF3D3',
    shade100: '#FBE7A7',
    shade200: '#F5D16A',
    shade300: '#E7B10A',
    shade400: '#C49508',
} as const;

export const surface = {
    white: '#FFFFFF',
    page: '#F7F1E5',
    muted: '#F5F0E0',
    header: '#F5F0E0',
    card: '#FFFFFF',
} as const;

export const slate = {
    50: '#f7f4ec',
    100: '#f0ebe0',
    200: '#ddd8c8',
    300: '#c5c0ae',
    400: '#a09b98',
    500: '#8a8680',
    600: '#6f6c66',
    700: '#55534d',
    800: '#3c3b36',
    900: '#262621',
} as const;

export const status = {
    error: '#dc2626',
    errorText: '#EF4444',
    errorLight: '#f87171',
    errorLighter: '#fca5a5',
    errorLightest: '#fecaca',
    errorUltraLight: '#fee2e2',
    success: '#16a34a',
    successLight: '#22c55e',
    successLighter: '#4ade80',
    successLightest: '#86efac',
    successUltraLight: '#bbf7d0',
    warning: '#d97706',
    warningLight: '#fde047',
    warningLighter: '#fbbf24',
    info: '#4C4B16',
    infoLight: '#7b8c41',
    infoLighter: '#a2bf35',
    amber: '#E7B10A',
    orangeDeep: '#C49508',
    orangeDeeper: '#A07806',
    orangeDarkest: '#7A5C04',
} as const;

export const chart: {
    productColors: string[];
    slopeColors: string[];
    donut: { label: string; value: number; color: string }[];
    clientDonut: { label: string; value: number; color: string }[];
    treemap: string[];
    heatmap: string[];
    topClients: string[];
    yearColors: string[];
    monthColors: string[];
    rankingEfficiency: string[];
    topProducts: string[];
    bottomProducts: string[];
    otherProducts: string[];
    softColors: string[];
    barSeries: string;
    scatter: string;
    lineValor: string;
    lineUnidades: string;
    activeYear: string;
    bluePalette: string[];
    topClientColors: string[];
} = {
    productColors: [
        '#6366f1', '#ef4444', '#f97316', '#eab308', '#22c55e',
        '#14b8a6', '#8b5cf6', '#06b6d4', '#3b82f6', '#f59e0b',
    ],
    slopeColors: [
        '#6366f1', '#ef4444', '#f97316', '#eab308', '#22c55e',
        '#14b8a6', '#8b5cf6', '#06b6d4', '#3b82f6', '#f59e0b',
    ],
    donut: [
        { label: 'MED-034', value: 10.8, color: '#E7B10A' },
        { label: 'MED-094', value: 11.5, color: '#ef4444' },
        { label: 'MED-124', value: 2.14, color: '#f87171' },
        { label: 'MED-022', value: 1.88, color: '#fb923c' },
        { label: 'MED-032', value: 1.68, color: '#c084fc' },
        { label: 'MED-038', value: 3.02, color: '#a78bfa' },
        { label: 'MED-18', value: 1.48, color: '#60a5fa' },
        { label: 'MED-008', value: 1.68, color: '#34d399' },
        { label: 'MED-001', value: 6.01, color: '#4ade80' },
        { label: 'MED-013', value: 9.11, color: '#86efac' },
        { label: 'MED-015', value: 11.4, color: '#6ee7b7' },
        { label: 'Others', value: 11.8, color: '#94a3b8' },
    ],
    clientDonut: [
        { label: 'COBECA', value: 14.58, color: '#4C4B16' },
        { label: 'BADAN', value: 8.9, color: '#7b8c41' },
        { label: 'FARMATODO', value: 8.54, color: '#a2bf35' },
        { label: 'VACUNMED', value: 12.0, color: '#E7B10A' },
        { label: 'HOSPIPHARMA', value: 28.98, color: '#C49508' },
        { label: 'OTROS', value: 27, color: '#F5D16A' },
    ],
    treemap: [
        '#2d3d1a', '#4C4B16', '#7b8c41', '#a2bf35', '#c4d488',
        '#E7B10A', '#C49508', '#A07806', '#FDF3D3',
        '#8C8C8C', '#B0B0B0', '#D0D0D0', '#EBEBEB',
    ],
    heatmap: ['#F7F1E5', '#F5D16A', '#E7B10A', '#7b8c41', '#4C4B16', '#2d3d1a'],
    topClients: ['#4C4B16', '#2d3d1a', '#7b8c41', '#a2bf35', '#c4d488', '#F5D16A', '#FBE7A7', '#F7F1E5'],
    yearColors: ['#4C4B16', '#E7B10A', '#16a34a', '#9333ea', '#e11d48', '#0891b2'],
    monthColors: [
        '#2d3d1a', '#4C4B16', '#7b8c41', '#a2bf35', '#c4d488', '#E7B10A',
        '#C49508', '#A07806', '#7A5C04', '#F5D16A', '#FBE7A7', '#FDF3D3',
    ],
    rankingEfficiency: [
        '#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0',
        '#fde047', '#fbbf24', '#fb923c', '#f87171', '#fca5a5', '#fecaca', '#fee2e2',
    ],
    topProducts: ['#2d3d1a', '#4C4B16', '#7b8c41', '#a2bf35', '#c4d488'],
    bottomProducts: ['#E7B10A', '#C49508', '#A07806', '#F5D16A', '#FBE7A7'],
    otherProducts: ['#2d3d1a', '#4C4B16', '#55534d', '#7b8c41', '#a2bf35', '#c4d488'],
    softColors: ['#a09b98', '#c5c0ae', '#ddd8c8', '#f0ebe0', '#f7f4ec'],
    barSeries: '#7b8c41',
    scatter: '#ef4444',
    lineValor: '#4C4B16',
    lineUnidades: '#E7B10A',
    activeYear: '#E7B10A',
    bluePalette: ['#4C4B16', '#2d3d1a', '#7b8c41', '#a2bf35', '#c4d488'],
    topClientColors: ['#2d3d1a', '#E7B10A', '#4C4B16', '#7b8c41', '#a2bf35'],
};

export const table = {
    paperBg: '#FFFFFF',
    paperBorder: '#ddd8c8',
    headerBg: '#F5F0E0',
    headerText: '#3c3b36',
    cellText: '#55534d',
    cellBorder: '#f0ebe0',
    footerBorder: '#f0ebe0',
    scrollbarThumb: 'alpha(\'#000\', 0.1)',
    scrollbarThumbLight: 'alpha(\'#000\', 0.05)',
    rowHoverBg: '#f0ebe0',
    selectedRowBg: '#ddd8c8',
} as const;

export const search = {
    bg: '#FFFFFF',
    border: '#ddd8c8',
    focusBorder: '#E7B10A',
    focusShadow: 'rgba(231,177,10,0.08)',
    iconColor: '#a09b98',
    clearColor: '#a09b98',
} as const;

export const axis = {
    line: '#ddd8c8',
    tick: '#ddd8c8',
    grid: '#f0ebe0',
    tickLabel: '#a09b98',
    label: '#8a8680',
} as const;

export const navigation = {
    sidebarBg: '#FFFFFF',
    topbarBg: '#FFFFFF',
    activeLink: '#E7B10A',
    linkText: '#4C4B16',
    hoverBg: '#F5F0E0',
} as const;

export const toggle = {
    checked: '#E7B10A',
    trackChecked: '#E7B10A',
    labelActive: '#E7B10A',
    labelDefault: '#a09b98',
} as const;

export const component = {
    logoBg: '#4C4B16',
    logoStroke: '#E7B10A',
    logoDot: '#fff',
    scrollbarThumb: '#c5c0ae',
    tooltipBg: '#3c3b36',
    tooltipText: '#fff',
    tooltipShadow: 'rgba(0,0,0,0.2)',
    tooltipShadowDark: 'rgba(0,0,0,0.25)',
    tooltipDesc: '#a09b98',
    kpiShadow: 'rgba(76,75,22,0.08)',
    cardShadow: 'rgba(76,75,22,0.07)',
    paperShadow: 'rgba(0,0,0,0.04)',
    menuShadow: 'rgba(0,0,0,0.1)',
    divider: '#ddd8c8',
    separator: '#ddd8c8',
    noValue: '#a09b98',
    errorText: '#EF4444',
    placeholder: '#a09b98',
    clearButtonText: '#8a8680',
    clearButtonHover: '#E7B10A',
    almacenButtonBorderDefault: '#ddd8c8',
    almacenButtonTextDefault: '#55534d',
    almacenButtonTextSelected: '#E7B10A',
    almacenButtonHoverBg: '#FFF',
    almacenButtonHoverBorder: '#E7B10A',
    heatmapDefaultCell: '#F5F0E0',
    heatmapEmptyDash: '#c5c0ae',
    heatmapTodayBorder: '#E7B10A',
    heatmapDayHeader: '#a09b98',
    treemapStroke: '#fff',
    treemapText: '#fff',
    treemapValueLabel: 'rgba(255,255,255,0.85)',
    donutArcLabel: '#fff',
    legendLabel: '#55534d',
    legendValue: '#3c3b36',
    kpiError: '#EF4444',
    kpiLoading: '#a09b98',
} as const;

export const contrast = {
    light: '#ffffff',
    dark: '#262621',
    textDark: '#3c3b36',
} as const;

export const custom = {
    headerTextAlt: '#3c3b36',
    cellTextAlt: '#55534d',
    headerBorderAlt: '#f0ebe0',
    cellBorderAlt: '#f0ebe0',
    selectBg: '#F5F0E0',
    selectBorder: '#ddd8c8',
    selectText: '#55534d',
    selectHoverBg: '#f0ebe0',
    storedText: '#3c3b36',
    searchBoxBg: '#F5F0E0',
    searchBoxBorder: '#ddd8c8',
    strongText: '#3c3b36',
} as const;

export const alert = {
    error: { bg: '#FEE2E2', border: '#FECACA', text: '#DC2626' },
    success: { bg: '#DCFCE7', border: '#BBF7D0', text: '#16A34A' },
    warning: { bg: '#FEF3C7', border: '#FDE68A', text: '#D97706' },
    info: { bg: '#FDF3D3', border: '#FBE7A7', text: '#4C4B16' },
} as const;

export const badge = {
    expired: { bg: '#FEE2E2', text: '#DC2626' },
    critical: { bg: '#FEE2E2', text: '#EF4444' },
    warning: { bg: '#FEF3C7', text: '#D97706' },
    success: { bg: '#DCFCE7', text: '#16A34A' },
    info: { bg: '#FDF3D3', text: '#4C4B16' },
} as const;

export const cxc = {
    alDia: '#4C4B16',
    porVencer15d: '#7b8c41',
    vencido30d: '#a2bf35',
    vencido60d: '#E7B10A',
    vencido90d: '#C49508',
    vencido120d: '#A07806',
    vencido120dPlus: '#7A5C04',
} as const;
