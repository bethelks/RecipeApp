import React, { useState, useEffect } from 'react';

const Collections = ({ favoriteRecipes }) => {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [draggedRecipe, setDraggedRecipe] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(''); // State for confirmation message

  // Fetch collections from localStorage on component mount
  useEffect(() => {
    const storedCollections = JSON.parse(localStorage.getItem('collections')) || [];
    if (Array.isArray(storedCollections)) {
      setCollections(storedCollections);
    } else {
      setCollections([]); // Fallback to an empty array if the data is not valid
    }
  }, []);

  // Save collections to localStorage
  const saveCollections = (updatedCollections) => {
    localStorage.setItem('collections', JSON.stringify(updatedCollections));
    setCollections(updatedCollections);
  };

  // Handle creating a new collection
  const handleCreateCollection = () => {
    if (newCollectionName.trim() === '') return;
    const updatedCollections = [...collections, { name: newCollectionName, recipes: [] }];
    saveCollections(updatedCollections);
    setNewCollectionName('');
    setIsModalOpen(false);
  };

  // Add a recipe to a collection
  const addRecipeToCollection = () => {
    if (!selectedCollection || !selectedRecipe) return;

    const updatedCollections = collections.map((collection) => {
      if (collection.name === selectedCollection) {
        // Prevent duplicate recipes in the collection
        const isDuplicate = collection.recipes.some((recipe) => recipe.id === selectedRecipe.id);
        if (!isDuplicate) {
          return { ...collection, recipes: [...collection.recipes, selectedRecipe] };
        }
      }
      return collection;
    });

    saveCollections(updatedCollections);
    setSelectedCollection('');
    setSelectedRecipe(null);

    // Show confirmation message
    setConfirmationMessage(`${selectedRecipe.title} added to ${selectedCollection}`);
    setTimeout(() => setConfirmationMessage(''), 3000); // Clear message after 3 seconds
  };

  // Handle drag start
  const handleDragStart = (recipe) => {
    setDraggedRecipe(recipe);
  };

  // Handle drop to reorder recipes
  const handleDrop = (collectionName, targetRecipe) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.name === collectionName) {
        const recipes = [...collection.recipes];
        const draggedIndex = recipes.findIndex((r) => r.id === draggedRecipe.id);
        const targetIndex = recipes.findIndex((r) => r.id === targetRecipe.id);

        // Reorder recipes
        recipes.splice(draggedIndex, 1);
        recipes.splice(targetIndex, 0, draggedRecipe);

        return { ...collection, recipes };
      }
      return collection;
    });

    saveCollections(updatedCollections);
    setDraggedRecipe(null);
  };

  return (
    <div>
      <h1>Your Collections</h1>
      <ul>
        {Array.isArray(collections) && collections.map((collection) => (
          <li key={collection.name}>
            <h3>{collection.name}</h3>
            <ul>
              {collection.recipes.map((recipe, index) => (
                <li
                  key={recipe.id}
                  draggable
                  onDragStart={() => handleDragStart(recipe)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(collection.name, recipe)}
                  style={{
                    border: draggedRecipe?.id === recipe.id ? '2px dashed #007BFF' : '1px solid #ccc',
                    padding: '8px',
                    marginBottom: '4px',
                    backgroundColor: draggedRecipe?.id === recipe.id ? '#e0f7ff' : '#f9f9f9',
                  }}
                >
                  {recipe.title}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Button to open modal */}
      <button onClick={() => setIsModalOpen(true)}>Create New Collection</button>

      {/* Modal for creating a new collection */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Collection</h2>
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection Name"
            />
            <button onClick={handleCreateCollection}>Create</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* UI for adding a recipe to a collection */}
      <div>
        <h3>Add Recipe to Collection</h3>
        {confirmationMessage && <p style={{ color: 'green' }}>{confirmationMessage}</p>} {/* Display confirmation */}
        <select onChange={(e) => setSelectedCollection(e.target.value)} value={selectedCollection}>
          <option value="">Select Collection</option>
          {collections.map((collection) => (
            <option key={collection.name} value={collection.name}>
              {collection.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedRecipe(JSON.parse(e.target.value))} value={selectedRecipe ? JSON.stringify(selectedRecipe) : ''}>
          <option value="">Select Recipe</option>
          {favoriteRecipes.map((recipe) => (
            <option key={recipe.id} value={JSON.stringify(recipe)}>
              {recipe.title}
            </option>
          ))}
        </select>
        <button onClick={addRecipeToCollection}>Add Recipe</button>
      </div>
    </div>
  );
};

export default Collections;
	

