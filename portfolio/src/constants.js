export const SECTIONS = {
    ABOUT: 'about',
    PORTFOLIO: 'portfolio',
    BLOG: 'blog',
    CONTACT: 'contact',
};

export const SECTIONS_LIST = [
    { id: SECTIONS.ABOUT, label: 'about me' },
    { id: SECTIONS.PORTFOLIO, label: 'portfolio' },
    { id: SECTIONS.BLOG, label: 'blog' },
    { id: SECTIONS.CONTACT, label: 'contact' },
];

export const getSectionLabel = (id) => {
    return SECTIONS_LIST.find((section) => section.id === id)?.label || 'NULL';
};
