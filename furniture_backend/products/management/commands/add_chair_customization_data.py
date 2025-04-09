from django.core.management.base import BaseCommand
from products.models import (
    ColorOption, MaterialOption, ChairTypeOption, ChairTypeFeature,
    LeatherTypeOption, BaseDesignOption, WheelDesignOption, ArmrestOption
)


class Command(BaseCommand):
    help = 'Add sample chair customization data to the database'

    def handle(self, *args, **kwargs):
        self.stdout.write('Adding chair customization data...')
        
        # Add colors
        colors = [
            {'name': 'Midnight Black', 'hex_code': '#000000'},
            {'name': 'Pure White', 'hex_code': '#FFFFFF'},
            {'name': 'Navy Blue', 'hex_code': '#000080'},
            {'name': 'Royal Red', 'hex_code': '#800000'},
            {'name': 'Forest Green', 'hex_code': '#228B22'},
            {'name': 'Silver Gray', 'hex_code': '#C0C0C0'},
        ]
        
        for color_data in colors:
            color, created = ColorOption.objects.get_or_create(
                name=color_data['name'],
                defaults={'hex_code': color_data['hex_code']}
            )
            if created:
                self.stdout.write(f'Added color: {color.name}')
        
        # Add materials
        materials = [
            {'name': 'Mesh', 'image': 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb', 'description': 'Breathable mesh material for comfort'},
            {'name': 'Fabric', 'image': 'https://images.unsplash.com/photo-1600841867003-288027264a54', 'description': 'Soft and durable fabric'},
            {'name': 'Leather', 'image': 'https://images.unsplash.com/photo-1516705564083-34e4a9e237d6', 'description': 'Premium leather for luxury feel'},
            {'name': 'Faux Leather', 'image': 'https://images.unsplash.com/photo-1582494787559-398d9de570a9', 'description': 'Eco-friendly synthetic leather'},
        ]
        
        for material_data in materials:
            material, created = MaterialOption.objects.get_or_create(
                name=material_data['name'],
                defaults={
                    'image': material_data['image'],
                    'description': material_data['description']
                }
            )
            if created:
                self.stdout.write(f'Added material: {material.name}')
        
        # Add chair types
        chair_types = [
            {
                'name': 'Executive Chair',
                'image': 'https://images.unsplash.com/photo-1519326884091-8e1457605309',
                'features': ['High back', 'Padded armrests', 'Premium materials', 'Adjustable height']
            },
            {
                'name': 'Task Chair',
                'image': 'https://images.unsplash.com/photo-1599627838219-0f3a732ee1b2',
                'features': ['Medium back', 'Adjustable height', 'Swivel base', 'Ergonomic design']
            },
            {
                'name': 'Gaming Chair',
                'image': 'https://images.unsplash.com/photo-1598550473832-626d18eb3c70',
                'features': ['Racing style', 'High back', 'Neck pillow', 'Lumbar support', 'Adjustable armrests']
            },
            {
                'name': 'Drafting Chair',
                'image': 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f',
                'features': ['Footrest ring', 'Extra height', 'Minimal design', 'Swivel base']
            },
        ]
        
        for chair_type_data in chair_types:
            chair_type, created = ChairTypeOption.objects.get_or_create(
                name=chair_type_data['name'],
                defaults={'image': chair_type_data['image']}
            )
            
            if created:
                self.stdout.write(f'Added chair type: {chair_type.name}')
                
                # Add features for this chair type
                for feature in chair_type_data['features']:
                    ChairTypeFeature.objects.get_or_create(
                        chair_type=chair_type,
                        feature=feature
                    )
        
        # Add leather types
        leather_types = [
            {'name': 'Full Grain Leather', 'texture': 'https://images.unsplash.com/photo-1631213034732-aea342768e11', 'description': 'Highest quality, most durable leather'},
            {'name': 'Top Grain Leather', 'texture': 'https://images.unsplash.com/photo-1617377377467-50f53d6e038f', 'description': 'Second highest quality, more flexible and softer'},
            {'name': 'Split Grain Leather', 'texture': 'https://images.unsplash.com/photo-1620876380549-7c95dd80e9ee', 'description': 'Lower layer of the hide, less expensive'},
            {'name': 'Bonded Leather', 'texture': 'https://images.unsplash.com/photo-1585238327135-c51158f2d7a4', 'description': 'Made from leftover leather pieces bonded together'},
        ]
        
        for leather_data in leather_types:
            leather, created = LeatherTypeOption.objects.get_or_create(
                name=leather_data['name'],
                defaults={
                    'texture': leather_data['texture'],
                    'description': leather_data['description']
                }
            )
            if created:
                self.stdout.write(f'Added leather type: {leather.name}')
        
        # Add base designs
        base_designs = [
            {'name': 'Standard Five-Star', 'image': 'https://images.unsplash.com/photo-1662463427763-85eed73ea262', 'description': 'Classic five-point star base'},
            {'name': 'Aluminum Pyramid', 'image': 'https://images.unsplash.com/photo-1600419075192-1bbc433ae20b', 'description': 'Modern aluminum pyramid base'},
            {'name': 'Chrome Five-Star', 'image': 'https://images.unsplash.com/photo-1665240226977-29dc3e637e54', 'description': 'Five-point star base with chrome finish'},
            {'name': 'Heavy Duty Metal', 'image': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2', 'description': 'Heavy duty metal base for extra weight support'},
        ]
        
        for base_data in base_designs:
            base, created = BaseDesignOption.objects.get_or_create(
                name=base_data['name'],
                defaults={
                    'image': base_data['image'],
                    'description': base_data['description']
                }
            )
            if created:
                self.stdout.write(f'Added base design: {base.name}')
        
        # Add wheel designs
        wheel_designs = [
            {'name': 'Standard Nylon', 'image': 'https://images.unsplash.com/photo-1623244767569-92bf20ab31e4', 'description': 'Standard nylon wheels for carpet'},
            {'name': 'Rubber Coated', 'image': 'https://images.unsplash.com/photo-1601203758756-32d0b56e4c1e', 'description': 'Rubber coated wheels for hard floors'},
            {'name': 'Rollerblade Style', 'image': 'https://images.unsplash.com/photo-1616464539218-c7efb4655577', 'description': 'Smooth rollerblade style wheels for any surface'},
            {'name': 'Locking Casters', 'image': 'https://images.unsplash.com/photo-1600596686_00c846c21f20', 'description': 'Wheels with locking mechanism'},
        ]
        
        for wheel_data in wheel_designs:
            wheel, created = WheelDesignOption.objects.get_or_create(
                name=wheel_data['name'],
                defaults={
                    'image': wheel_data['image'],
                    'description': wheel_data['description']
                }
            )
            if created:
                self.stdout.write(f'Added wheel design: {wheel.name}')
        
        # Add armrest options
        armrest_options = [
            {'name': 'Fixed', 'material': 'Plastic', 'description': 'Fixed position plastic armrests'},
            {'name': '1D Adjustable', 'material': 'Nylon', 'description': 'Height adjustable armrests'},
            {'name': '2D Adjustable', 'material': 'Padded', 'description': 'Height and width adjustable armrests'},
            {'name': '3D Adjustable', 'material': 'Memory Foam', 'description': 'Height, width, and depth adjustable armrests'},
            {'name': '4D Adjustable', 'material': 'Leather', 'description': 'Height, width, depth, and angle adjustable armrests'},
            {'name': 'No Armrests', 'material': 'None', 'description': 'Chair without armrests for more freedom of movement'},
        ]
        
        for armrest_data in armrest_options:
            armrest, created = ArmrestOption.objects.get_or_create(
                name=armrest_data['name'],
                defaults={
                    'material': armrest_data['material'],
                    'description': armrest_data['description']
                }
            )
            if created:
                self.stdout.write(f'Added armrest option: {armrest.name}')
        
        self.stdout.write(self.style.SUCCESS('Successfully added chair customization data'))