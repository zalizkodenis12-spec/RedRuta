import os

path = 'index.html'
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Main text
    old_intro = "D&D Flowers — це не просто квіти, це емоції, які залишаються надовго. Ми щодня закуповуємо найсвіжіші квіти прямо на базі, а наші флористи з душею збирають кожен букет. Ми розуміємо, що кожен привід особливий — тому завжди підберемо ідеальний варіант саме для вас. Довіртесь нам — і ваш близький точно буде в захваті."
    new_intro = "Червона Рута — це не просто заклад, це місце де хочеться затриматись. Ми щодня готуємо страви з свіжих продуктів, а наші кухарі вкладають душу в кожну тарілку. Розуміємо що кожен гість особливий — тому завжди підберемо ідеальну страву саме для вас. Довіртесь нам — і ваш візит точно запам'ятається."
    content = content.replace(old_intro, new_intro)

    # Advantages
    content = content.replace("Швидка доставка", "Гарячі страви")
    content = content.replace("Доставимо букет за 60 хвилин по місту", "Готуємо і подаємо гарячим, з пилу з жару")
    
    content = content.replace("Свіжі квіти щодня", "Свіжі продукти")
    content = content.replace("Закуповуємо квіти щоранку на базі", "Тільки якісні інгредієнти щодня")

    content = content.replace("Флорист на зв'язку", "Затишна атмосфера")
    content = content.replace("Підкажемо і зберемо букет під ваш запит", "Місце, де хочеться затриматись з близькими")

    content = content.replace("Оплата як зручно", "Авторська кухня")
    content = content.replace("Карткою онлайн або готівкою кур'єру", "Страви за власними рецептами шеф-кухаря")

    # Instagram link
    content = content.replace("https://instagram.com/d.n.d_flowers", "https://instagram.com/chervona_ruta_/")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("index.html updated successfully.")
