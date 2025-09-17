# Recipe Data Format

This cookbook uses a JSON file (`recipes.json`) to store all recipe data, making it easy to add, edit, or remove recipes.

## Recipe Format

Each recipe in the JSON file follows this structure:

```json
{
  "id": "unique-recipe-identifier",
  "title": "Recipe Name",
  "year": "Est. YYYY",
  "category": "appetizers|mains|desserts|drinks",
  "image": "./path-to-image.jpg",
  "prepTime": "Prep/Cook time description",
  "serves": "Serves X-Y",
  "servingSize": "1 slice (1/X recipe)",
  "ingredients": [
    "Ingredient 1 with amount",
    "Ingredient 2 with amount"
  ],
  "instructions": [
    {
      "step": 1,
      "text": "First step instructions"
    },
    {
      "step": 2,
      "text": "Second step instructions"
    }
  ],
  "nutrition": {
    "calories": 405,
    "protein": "6.8g",
    "carbs": "43g",
    "fat": "23g",
    "sugar": "40g",
    "fiber": "2.6g"
  }
}
```

## Adding New Recipes

1. **Add recipe image**: Save image file in the vintage-cookbook folder
2. **Update recipes.json**: Add new recipe object to the "recipes" array
3. **Follow the format**: Use the structure above for consistency
4. **Use metric measurements**: All ingredients should use grams, ml, etc.
5. **Celsius temperatures**: All temperatures should be in Celsius

## Categories

- `appetizers` - Starters and small plates
- `mains` - Main course dishes
- `desserts` - Sweets and desserts
- `drinks` - Beverages and cocktails

## Image Guidelines

- **Size**: Recommended 400x200px for optimal display
- **Format**: JPG or PNG
- **File naming**: Use lowercase with hyphens (e.g., `chocolate-cake.jpg`)
- **Storage**: Save images directly in the vintage-cookbook folder

The cookbook automatically loads and displays all recipes from the JSON file with proper styling and functionality.