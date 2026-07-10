// Centralized image helper using Pexels royalty-free photos.
const px = (id: number, w = 600, h = 400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const img = {
  hero: px(8617715, 1600, 900),
  campus: px(207684, 1200, 800),
  building: px(5212315, 1200, 800),
  library: px(256541, 800, 600),
  lab: px(2280571, 800, 600),
  sports: px(2526874, 800, 600),
  classroom: px(207692, 800, 600),
  event: px(1190297, 800, 600),
  independence: px(2383053, 800, 600),
  annualDay: px(167699, 800, 600),
  scienceEx: px(3825529, 800, 600),
  music: px(164743, 800, 600),
  dance: px(2526878, 800, 600),
  robotics: px(3825572, 800, 600),
  computer: px(777001, 800, 600),
  hostel: px(1571460, 800, 600),
  medical: px(263402, 800, 600),
  transport: px(207011, 800, 600),
  principal: px(220453, 400, 400),
  chairman: px(1681010, 400, 400),
  teacher1: px(1239291, 400, 400),
  teacher2: px(1181686, 400, 400),
  teacher3: px(733872, 400, 400),
  teacher4: px(762020, 400, 400),
  student1: px(1130626, 400, 400),
  student2: px(1222271, 400, 400),
  student3: px(712513, 400, 400),
  student4: px(1239295, 400, 400),
  parent1: px(1189810, 400, 400),
  parent2: px(1063648, 400, 400),
  avatar: (seed: string) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=2563eb,1d4ed8,0f766e,c2410c&textColor=ffffff`,
};

export const galleryImages = [
  { src: img.building, title: 'School Building', tag: 'Campus' },
  { src: img.library, title: 'Library', tag: 'Academics' },
  { src: img.lab, title: 'Science Laboratory', tag: 'Labs' },
  { src: img.sports, title: 'Sports Complex', tag: 'Sports' },
  { src: img.classroom, title: 'Smart Classroom', tag: 'Academics' },
  { src: img.event, title: 'Annual Event', tag: 'Events' },
  { src: img.independence, title: 'Independence Day', tag: 'Events' },
  { src: img.annualDay, title: 'Annual Day', tag: 'Functions' },
  { src: img.scienceEx, title: 'Science Exhibition', tag: 'Events' },
  { src: img.music, title: 'Music Room', tag: 'Arts' },
  { src: img.dance, title: 'Dance Studio', tag: 'Arts' },
  { src: img.robotics, title: 'Robotics Lab', tag: 'Labs' },
];
