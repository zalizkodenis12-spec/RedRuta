import re
import random

with open("assets/js/products.js", "r", encoding="utf-8") as f:
    content = f.read()

diet = ["Вегетаріанське", "Без глютену", "Гостре", "Дитяче меню"]

def add_diet(match):
    d1 = random.choice(diet)
    d2 = random.choice(diet)
    if random.random() > 0.5:
        return f'"dietFeatures": ["{d1}", "{d2}"],\n    "sales"'
    elif random.random() > 0.5:
        return f'"dietFeatures": ["{d1}"],\n    "sales"'
    else:
        return f'"dietFeatures": [],\n    "sales"'

new_content = re.sub(r'"sales"', add_diet, content)

with open("assets/js/products.js", "w", encoding="utf-8") as f:
    f.write(new_content)
