import '../styles/community.css';
import { useState, useRef, useEffect } from 'react';
import { Navbar } from '../components/Navbar';

import SignupGraphic from '../assets/Sign-up-graphic.png';
import DrLee from '../assets/Amara-lee.jpg';
import DrCarter from '../assets/Jamal-carter.jpg';
import DrWells from '../assets/Nina-wells.jpg';
import DrMoss from '../assets/Theo-moss.jpg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const API_KEY = "3a51beef9dba464f82d208977d2fc0ef";

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [30, 30],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface Tip {
  id: number;
  category: string;
  title: string;
  content: string;
}

type Recipe = {
  id: number;
  image: string;
  title: string;
  instructions?: string;
  analyzedInstructions?: {
    steps: { step: string }[];
  }[];
};

export const Community = () => {
  const [activeTab, setActiveTab] = useState<'practitioners' | 'recipes' | 'tips'>('practitioners');
  const [activeDoctorId, setActiveDoctorId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [tips, setTips] = useState<Tip[]>([]);
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const recipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await fetch('/chronic_illness_tips.json');
        const data = await res.json();
        setTips(data.tips || data);
        setFilteredTips(data.tips || data);
      } catch (err) {
        console.error('Error loading tips', err);
      }
    };

    fetchTips();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredTips(tips);
    } else {
      setFilteredTips(tips.filter(tip => tip.category === selectedCategory));
    }
  }, [selectedCategory, tips]);

  const handleRecipeClick = async (recipeId: number) => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Recipe detail API error:", errorData);
        return;
      }
      const data = await res.json();
      setSelectedRecipe({
        id: data.id,
        image: data.image,
        title: data.title,
        instructions: data.instructions || 'No instructions available.',
      });
      setTimeout(() => {
        recipeRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } catch (error) {
      console.error("Fetch recipe details failed:", error);
    }
  };

  const searchRecipes = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
          query
        )}&number=10&intolerances=gluten,lactose&tags=low+FODMAP,anti-inflammatory&apiKey=${API_KEY}`
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API error:", errorData);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setRecipes(data.results || []);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
    setLoading(false);
  };

  const toggleNoteCard = (id: number) => {
    setActiveDoctorId(activeDoctorId === id ? null : id);
  };

  const handleTabChange = (tab: 'practitioners' | 'recipes' | 'tips') => {
    setActiveTab(tab);
  };

  const categories = ['All', ...new Set(tips.map(tip => tip.category))];

  const practitioners = [
    {
      id: 1,
      name: 'Dr. Amara Lee',
      specialty: 'Acupuncture',
      image: DrLee,
      lat: 39.9526,
      lng: -75.1652,
      note: 'Specialist in digestive acupuncture and chronic inflammation.',
    },
    {
      id: 2,
      name: 'Dr. Jamal Carter',
      specialty: 'Chiropractic',
      image: DrCarter,
      lat: 39.9612,
      lng: -75.1675,
      note: 'Focused on spinal alignment for gut-brain balance.',
    },
    {
      id: 3,
      name: 'Dr. Nina Wells',
      specialty: 'Nutrition',
      image: DrWells,
      lat: 39.945,
      lng: -75.173,
      note: 'Gut-health diet plans and plant-based regimens.',
    },
    {
      id: 4,
      name: 'Dr. Theo Moss',
      specialty: 'Oriental Medicine',
      image: DrMoss,
      lat: 39.9622,
      lng: -75.144,
      note: 'Combines herbal therapy with ancient digestive practices.',
    },
  ];

  const morePractitioners = [
    { id: 5, name: 'Dr. Maya Patel', specialty: 'Acupuncture', note: 'Expert in stress relief and digestive health.', lat: 39.9500, lng: -75.1600 },
    { id: 6, name: 'Dr. Alex Kim', specialty: 'Chiropractic', note: 'Specializes in holistic spinal care for IBS.', lat: 39.9550, lng: -75.1620 },
    { id: 7, name: 'Dr. Priya Singh', specialty: 'Nutrition', note: 'Specializes in balanced meals for anti-inflammatory diets', lat: 39.9580, lng: -75.1680 },
    { id: 8, name: 'Dr. Samuel Green', specialty: 'Oriental Medicine', lat: 39.9600, lng: -75.1500, note: 'Integrates acupuncture with herbal remedies for digestive issues.' },
    { id: 9, name: 'Dr. Olivia Chen', specialty: 'Acupuncture', lat: 39.9530, lng: -75.1550, note: 'Focuses on holistic approaches to chronic pain and IBS.' },
    { id: 10, name: 'Dr. Marcus Lee', specialty: 'Nutrition', lat: 39.9490, lng: -75.1700, note: 'Expert in anti-inflammatory diets and gut health.' },
    { id: 11, name: 'Dr. Amy Cursor', specialty: 'Oriental Medicine', lat: 39.9610, lng: -75.1480, note: 'Combines acupuncture with dietary therapy for digestive wellness.' },
    { id: 12, name: 'Dr. Jordan Rice', specialty: 'Chiropractic', lat: 39.9470, lng: -75.1660, note: 'Specializes in spinal adjustments for digestive disorders.' },
  ];

  return (
    <div className="community-container">
      <Navbar />

      
      <div className="tabs">
        <button onClick={() => handleTabChange('practitioners')} className={activeTab === 'practitioners' ? 'active' : 'inactive'}>
          Holistic Practitioners
        </button>
        <button onClick={() => handleTabChange('recipes')} className={activeTab === 'recipes' ? 'active' : 'inactive'}>
          Recipes
        </button>
        <button onClick={() => handleTabChange('tips')} className={activeTab === 'tips' ? 'active' : 'inactive'}>
          Tips
        </button>
      </div>

      <div className="content-section">
        {activeTab === 'practitioners' && (
          <>
            <div className="practitioner-scroll">
              {practitioners.map((doc) => (
                <div 
                  key={doc.id}
                  className="practitioner-card"
                  onClick={() => toggleNoteCard(doc.id)}
                >
                  <img className="doctor-pics" src={doc.image} alt={doc.name} />
                  <p className="practitioner-name">{doc.name}</p>
                  {activeDoctorId === doc.id && (
                    <div className="note-card">
                      <p className="note-text">{doc.note}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="doctor-map">
              <h3 className="doctormap-description">Find a Practitioner Near You</h3>
              <p className="doctormap-description">Use our interactive map to locate holistic practitioners in your area.</p>
              <MapContainer 
                center={[39.9526, -75.1652]}
                zoom={12} 
                style={{ height: '400px', width: '100%', borderRadius: '12px' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  className="tile-layer"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {practitioners.map((doc) => (
                  <Marker key={doc.id} position={[doc.lat, doc.lng]} icon={customIcon}>
                    <Popup>
                      <strong>{doc.name}</strong><br />
                      {doc.specialty}<br />
                      {doc.note}
                    </Popup>
                  </Marker>
                ))}
                {morePractitioners.map((doc) => (
                  <Marker key={doc.id} position={[doc.lat, doc.lng]} icon={customIcon}>
                    <Popup>
                      <strong>{doc.name}</strong><br />
                      {doc.specialty}<br />
                      {doc.note || ''}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="more-practitioners-scroll">
              {morePractitioners.map((doc) => {
                let colorVar;
                switch (doc.specialty) {
                  case 'Acupuncture':
                    colorVar = 'var(--salmon)';
                    break;
                  case 'Chiropractic':
                    colorVar = 'var(--orange)';
                    break;
                  case 'Nutrition':
                    colorVar = 'var(--green)';
                    break;
                  case 'Oriental Medicine':
                    colorVar = 'var(--yellow)';
                    break;
                  default:
                    colorVar = 'var(--tan)';
                }
                return (
                  <div
                    key={doc.id}
                    className="more-practitioner-card"
                    style={{ backgroundColor: colorVar }}
                  >
                    <p className="more-practitioner-name">{doc.name}</p>
                    <p className="more-practitioner-specialty">{doc.specialty}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'recipes' && (
          <div className="recipe-section">
            <input
              type="text"
              className="search-bar"
              placeholder="Search IBS friendly recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={searchRecipes} className="search-button">Search</button>
            <div className="recipe-placeholder">
              {loading && <p>Loading recipes...</p>}
              <div className="recipe-results">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="recipe-card" onClick={() => handleRecipeClick(recipe.id)} style={{ cursor: 'pointer' }}>
                    <img className='recipe-img' src={recipe.image} alt={recipe.title} />
                    <h4>{recipe.title}</h4>
                  </div>
                ))}
                {selectedRecipe && (
                  <div className="recipe-detail">
                    <h2 className='recipe-title'>{selectedRecipe.title}</h2>
                    <img src={selectedRecipe.image} alt={selectedRecipe.title} />
                    <div ref={recipeRef}>
                      <h3>Instructions</h3>
                      <p className='results-p' dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions || "No instructions provided." }} />
                      <button className='close-btn' onClick={() => setSelectedRecipe(null)}>Close</button>
                    </div>
                  </div>
                )}
                {selectedRecipe?.analyzedInstructions?.[0]?.steps
                  ?.filter((step: any) => step.step.toLowerCase() !== 'directions')
                  .map((step: any, i: number) => (
                    <li key={i}>{step.step}</li>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="tips-section">
            <img src={SignupGraphic} alt="graphic" className="tips-graphic" />
            <h3 className='tips-title'>Holistic Tips for Chronic Illness</h3>
            <div className="category-tabs">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${selectedCategory === category ? 'active-category' : ''} category-${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                  data-category={category}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="tips-list">
              {filteredTips.length > 0 ? (
                filteredTips.map(tip => (
                  <div key={tip.id} className="tip-card">
                    <h4>{tip.title}</h4>
                    <p className={`tip-category category-${tip.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}>
                      {tip.category}
                    </p>
                    <p className="tip-content">{tip.content}</p>
                  </div>
                ))
              ) : (
                <p>No tips available for this category.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};