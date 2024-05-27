import React, { useState } from 'react';
import Popup from './Popup.js'; // Ensure the path is correct

import herbalTheme from '../assets/Herbal/herbal_theme.jpg';
import meditationTheme from '../assets/Meditation/meditation_theme.jpg';
import fitnessTheme from '../assets/Fitness/Fitness_theme.jpeg';
import yogaThene from '../assets/Yoga/yoga_theme.jpeg';


// Import images directly
import yoga1 from '../assets/Yoga/yoga1.jpg';
import yoga2 from '../assets/Yoga/yoga2.jpg';
import yoga3 from '../assets/Yoga/yoga3.jpg';
import yoga4 from '../assets/Yoga/yoga4.jpg';
import yoga5 from '../assets/Yoga/yoga5.jpg';
import yoga6 from '../assets/Yoga/yoga6.jpg';
import yoga7 from '../assets/Yoga/yoga7.jpg';




import fitness1 from '../assets/Fitness/fitness1.jpg';
import fitness2 from '../assets/Fitness/fitness2.jpg';
import fitness3 from '../assets/Fitness/fitness3.jpg';
import fitness4 from '../assets/Fitness/fitness4.jpg';
import fitness5 from '../assets/Fitness/fitness5.jpg';
import fitness6 from '../assets/Fitness/fitness6.jpg';
import fitness7 from '../assets/Fitness/fitness7.jpg';

import meditation1 from '../assets/Meditation/meditation1 (1).jpg';
import meditation2 from '../assets/Meditation/meditation1 (2).jpg';
import meditation3 from '../assets/Meditation/meditation1 (3).jpg';
import meditation4 from '../assets/Meditation/meditation1 (4).jpg';
import meditation5 from '../assets/Meditation/meditation1 (5).jpg';
import meditation6 from '../assets/Meditation/meditation1 (6).jpg';
import meditation7 from '../assets/Meditation/meditation1 (7).jpg';
import meditation8 from '../assets/Meditation/meditation1 (8).jpg';


import herbal1 from '../assets/Herbal/herbal1 (1).jpg';
import herbal2 from '../assets/Herbal/herbal1 (2).jpg';
import herbal3 from '../assets/Herbal/herbal1 (3).jpg';
import herbal4 from '../assets/Herbal/herbal1 (4).jpg';
import herbal5 from '../assets/Herbal/herbal1 (5).jpg';
import herbal6 from '../assets/Herbal/herbal1 (6).jpg';
import herbal7 from '../assets/Herbal/herbal1 (7).jpg';
import herbal8 from '../assets/Herbal/herbal1 (8).jpg';


// Sample images for each category
const yogaImages = [yoga1,yoga2,yoga3,yoga4,yoga5,yoga6,yoga7];

const fitnessImages = [fitness1, fitness2, fitness3, fitness4, fitness5, fitness6, fitness7];


const meditationImages = [
    meditation1,
    meditation2,
    meditation3,
    meditation4,
    meditation5,
    meditation6,
    meditation7,
    meditation8
  ];
  

  const herbalImages = [
    herbal1, herbal2, herbal3, herbal4, herbal5, herbal6, herbal7, herbal8
  ];
  

const categories = [
  {
    title: 'Yoga',
    description: 'Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India. It is a holistic practice that combines physical postures (asanas), breathing techniques (pranayama), and meditation (dhyana) to promote overall health and well-being. Regular practice of yoga can improve flexibility, strength, and balance, reduce stress, and enhance mental clarity and emotional stability.',
    imageUrl: yogaThene,
    images: yogaImages,
  },
  {
    title: 'Fitness',
    description: 'Fitness refers to the state of being physically fit and healthy. It encompasses a variety of physical activities that help improve cardiovascular health, muscular strength, endurance, flexibility, and body composition. Regular exercise, whether it’s aerobic activities like running and cycling, strength training like lifting weights, or flexibility exercises like stretching, is essential for maintaining a healthy body and mind. Fitness also includes proper nutrition, adequate rest, and maintaining a balanced lifestyle.',
    imageUrl: fitnessTheme,
    images: fitnessImages,
  },
  {
    title: 'Meditation',
    description: 'Meditation is a practice where an individual uses a technique – such as mindfulness, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state. It has been practiced since antiquity in numerous religious traditions and beliefs, often as part of the path towards enlightenment and self-realization. Benefits of meditation include reduced stress, improved concentration, lower blood pressure, and enhanced emotional health.',
    imageUrl: meditationTheme,
    images: meditationImages,
  },
  {
    title: 'Herbal Products',
    description: 'Herbal products are made from plants that are used for their therapeutic or medicinal properties. They can come in various forms, including teas, capsules, powders, and extracts. Herbs have been used for centuries in traditional medicine systems such as Ayurveda and Traditional Chinese Medicine to treat a wide range of health conditions. Common herbal products include echinacea for immune support, chamomile for relaxation, and turmeric for its anti-inflammatory properties. Using herbal products can offer a natural and holistic approach to health and wellness.',
    imageUrl: herbalTheme,
    images: herbalImages,
  },
];

const Learn = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openPopup = (category) => {
    setSelectedCategory(category);
  };

  const closePopup = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen h-screen overflow-y-scroll">
      <h1 className="text-4xl font-bold mb-8 text-center">Learn</h1>
      <div className="space-y-12">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => openPopup(category)}
          >
            <img
              className="w-full md:w-1/2 object-cover max-h-64"
              src={category.imageUrl}
              alt={category.title}
            />
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
              <p className="text-lg">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <Popup images={selectedCategory.images} onClose={closePopup} />
      )}
    </div>
  );
};

export default Learn;
