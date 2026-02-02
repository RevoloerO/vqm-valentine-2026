// Photo data for the gallery
// Replace placeholder images with your actual photos
// Add photos to src/assets/photos/ folder

import photo1 from '../assets/photos/photo-1.jpg';
import photo2 from '../assets/photos/photo-2.jpg';
import photo3 from '../assets/photos/photo-3.jpg';
import photo4 from '../assets/photos/photo-4.jpg';
import photo5 from '../assets/photos/photo-5.jpg';
import photo6 from '../assets/photos/photo-6.jpg';

const photoData = [
  {
    id: 1,
    image: photo1,
    title: 'First Meeting',
    description: 'The day our story began',
    category: 'memories',
    badge: null
  },
  {
    id: 2,
    image: photo2,
    title: 'A Special Moment',
    description: 'One of my favorite memories with you',
    category: 'memories',
    badge: null
  },
  {
    id: 3,
    image: photo3,
    title: 'Nursing School Acceptance',
    description: 'You did it! RN Class of 2026',
    category: 'achievements',
    badge: 'nurse'
  },
  {
    id: 4,
    image: photo4,
    title: 'Together',
    description: 'Every moment with you is precious',
    category: 'memories',
    badge: null
  },
  {
    id: 5,
    image: photo5,
    title: 'Your Achievement',
    description: 'So proud of everything you\'ve accomplished',
    category: 'achievements',
    badge: 'achievement'
  },
  {
    id: 6,
    image: photo6,
    title: 'Our Future',
    description: 'Looking forward to forever with you',
    category: 'memories',
    badge: null
  }
];

export default photoData;
