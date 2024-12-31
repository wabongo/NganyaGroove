import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import BlockRevealer from '../components/BlockRevealer/BlockRevealer';
import './Categories.css';

const categories = [
  {
    id: 'best-design',
    name: 'Best Overall Design',
    description: 'Most visually striking and innovative Matatu design',
    criteria: [
      'Unique and creative exterior design',
      'Quality of artwork and graphics',
      'Interior design and comfort',
      'Overall aesthetic appeal'
    ]
  },
  {
    id: 'best-sound',
    name: 'Best Sound System',
    description: 'Superior audio quality and entertainment experience',
    criteria: [
      'Sound system quality and clarity',
      'Bass response and balance',
      'Entertainment system features',
      'Overall audio experience'
    ]
  },
  {
    id: 'best-crew',
    name: 'Best Crew',
    description: 'Most professional and entertaining crew',
    criteria: [
      'Customer service quality',
      'Professionalism and conduct',
      'Entertainment value',
      'Passenger safety consideration'
    ]
  },
  {
    id: 'best-route',
    name: 'Best Route Experience',
    description: 'Most enjoyable and well-serviced route',
    criteria: [
      'Service reliability',
      'Route coverage',
      'Customer satisfaction',
      'Safety record'
    ]
  },
  {
    id: 'rising-star',
    name: 'Rising Star',
    description: 'Most promising new Matatu on the scene',
    criteria: [
      'Innovation and creativity',
      'Growth potential',
      'Customer feedback',
      'Overall impact'
    ]
  }
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'nominations'));
        const nomineeData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNominees(nomineeData);
      } catch (error) {
        console.error('Error fetching nominees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNominees();
  }, []);

  const getNomineesForCategory = (categoryId) => {
    return nominees.filter(nominee => nominee.category === categoryId);
  };

  return (
    <div className="categories">
      <BlockRevealer
        direction="tb"
        bgcolor="#ff784a"
        delay={200}
      >
        <h1 className="categories__title">Award Categories</h1>
        <p className="categories__subtitle">Celebrating excellence in Nairobi's Matatu culture</p>
      </BlockRevealer>

      <div className="categories__grid">
        {categories.map((category, index) => (
          <BlockRevealer
            key={category.id}
            direction={index % 2 === 0 ? 'lr' : 'rl'}
            bgcolor="#7f40f1"
            delay={300 + index * 100}
            className="categories__item-wrapper"
          >
            <div 
              className={`categories__item ${selectedCategory?.id === category.id ? 'is-selected' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <div className="categories__item-stats">
                <span>{getNomineesForCategory(category.id).length} Nominations</span>
              </div>
            </div>
          </BlockRevealer>
        ))}
      </div>

      {selectedCategory && (
        <BlockRevealer
          direction="bt"
          bgcolor="#ff784a"
          delay={200}
          className="categories__detail"
        >
          <div className="categories__detail-content">
            <h2>{selectedCategory.name}</h2>
            <p className="categories__detail-description">{selectedCategory.description}</p>
            
            <div className="categories__criteria">
              <h3>Judging Criteria</h3>
              <ul>
                {selectedCategory.criteria.map((criterion, index) => (
                  <li key={index}>{criterion}</li>
                ))}
              </ul>
            </div>

            <div className="categories__nominees">
              <h3>Current Nominees</h3>
              {loading ? (
                <p>Loading nominees...</p>
              ) : (
                <div className="categories__nominees-grid">
                  {getNomineesForCategory(selectedCategory.id).map((nominee) => (
                    <BlockRevealer
                      key={nominee.id}
                      direction="lr"
                      bgcolor="#7f40f1"
                      delay={200}
                      className="categories__nominee"
                    >
                      <h4>{nominee.matatuName}</h4>
                      <p>Route: {nominee.route}</p>
                      <p>Crew: {nominee.crew}</p>
                    </BlockRevealer>
                  ))}
                </div>
              )}
            </div>
          </div>
        </BlockRevealer>
      )}
    </div>
  );
};

export default Categories;
