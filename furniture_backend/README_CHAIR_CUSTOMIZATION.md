# Chair Customization Feature Documentation

This document explains the chair customization feature implemented in the furniture backend API.

## Overview

The chair customization feature allows users to customize office chairs by selecting different options for:

- Chair type (Executive, Task, Gaming, Drafting)
- Color options
- Material options (Mesh, Fabric, Leather, Faux Leather)
- Leather types (when leather material is selected)
- Base designs
- Wheel designs
- Armrest options

## API Endpoints

### Main Customization Options Endpoint

**GET /api/data/chair-customization**

This endpoint returns all available chair customization options in a single response:

```json
{
  "colors": [
    { "id": "1", "name": "Midnight Black", "hex_code": "#000000" },
    { "id": "2", "name": "Pure White", "hex_code": "#FFFFFF" },
    ...
  ],
  "materials": [
    { 
      "id": "1", 
      "name": "Mesh", 
      "image": "https://example.com/mesh.jpg",
      "description": "Breathable mesh material for comfort" 
    },
    ...
  ],
  "chair_types": [
    { 
      "id": "1", 
      "name": "Executive Chair", 
      "image": "https://example.com/executive.jpg",
      "features": ["High back", "Padded armrests", "Premium materials", "Adjustable height"]
    },
    ...
  ],
  "leather_types": [...],
  "base_designs": [...],
  "wheel_designs": [...],
  "armrests": [...]
}
```

### Individual Option Endpoints

Individual CRUD endpoints are available for each option type:

- **GET /api/colors/** - List all color options
- **GET /api/materials/** - List all material options
- **GET /api/chair-types/** - List all chair type options
- **GET /api/leather-types/** - List all leather type options
- **GET /api/base-designs/** - List all base design options
- **GET /api/wheel-designs/** - List all wheel design options
- **GET /api/armrests/** - List all armrest options

Each of these endpoints also supports POST (create), PUT/PATCH (update), and DELETE operations.

### Special Endpoints for Chair Types

- **POST /api/chair-types/{id}/add_feature/** - Add a feature to a chair type
  - Body: `{"feature": "Feature text"}`
- **DELETE /api/chair-types/{id}/remove_feature/** - Remove a feature from a chair type
  - Body: `{"feature": "Feature text"}`

## Database Models

The feature is implemented with the following models:

1. **ColorOption**: Stores chair color options with hex codes
2. **MaterialOption**: Stores material types with images and descriptions
3. **ChairTypeOption**: Stores chair types with images
4. **ChairTypeFeature**: Stores features for each chair type
5. **LeatherTypeOption**: Stores leather type options with textures and descriptions
6. **BaseDesignOption**: Stores base design options with images
7. **WheelDesignOption**: Stores wheel design options with images
8. **ArmrestOption**: Stores armrest options with materials and descriptions

## Sample Data

The project includes a management command to populate the database with sample data:

```bash
python manage.py add_chair_customization_data
```

This command adds:
- 6 color options
- 4 material options
- 4 chair types with their features
- 4 leather types
- 4 base designs
- 4 wheel designs
- 6 armrest options

## Frontend Integration

Frontend applications can consume these endpoints to build a chair customizer that allows users to:

1. Select options for each component of the chair
2. Visualize their selections
3. Calculate dynamic pricing based on selections
4. Add the customized chair to a shopping cart

## Price Calculation Logic

Pricing for customized chairs can be determined using a base price plus adjustments for each selected option:

- Base chair price: $299.99
- Executive Chair: +$150
- Gaming Chair: +$100
- Task Chair: +$0 (base model)
- Drafting Chair: +$50
- Material upgrades: +$0-100 depending on material
- Premium leather types: +$10-80 depending on quality
- Base design upgrades: +$0-50
- Wheel design upgrades: +$0-30
- Armrest upgrades: -$10 to +$60

## CORS Support

The API is configured with CORS support to allow cross-origin requests from any domain. This makes it easier to integrate with frontend applications hosted on different domains.
