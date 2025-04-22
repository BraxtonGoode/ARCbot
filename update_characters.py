import json
import os
import tkinter as tk
from tkinter import messagebox

FILENAME = "characters.json"

# Load existing characters
def load_characters():
    if os.path.exists(FILENAME):
        with open(FILENAME, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

# Save updated characters
def save_characters(data):
    with open(FILENAME, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

# Handle Save Button
def save_character():
    name = name_entry.get().strip()
    img1 = img1_entry.get().strip()
    img2 = img2_entry.get().strip()

    if not name or not img1 or not img2:
        messagebox.showwarning("Missing Info", "Please fill out all fields.")
        return

    characters[name.lower()] = {
        "name": name,
        "image1": img1,
        "image2": img2
    }
    save_characters(characters)
    messagebox.showinfo("Saved", f"Character '{name}' has been saved.")
    update_dropdown()
    clear_fields()

# Handle Dropdown Change
def load_selected_character(event):
    selected = char_var.get().lower()
    if selected in characters:
        char_data = characters[selected]
        name_entry.delete(0, tk.END)
        name_entry.insert(0, char_data["name"])
        img1_entry.delete(0, tk.END)
        img1_entry.insert(0, char_data["image1"])
        img2_entry.delete(0, tk.END)
        img2_entry.insert(0, char_data["image2"])

# Update dropdown menu options
def update_dropdown():
    menu = char_dropdown["menu"]
    menu.delete(0, "end")
    for char in sorted(characters.keys()):
        menu.add_command(label=char, command=tk._setit(char_var, char, load_selected_character))

# Clear input fields
def clear_fields():
    name_entry.delete(0, tk.END)
    img1_entry.delete(0, tk.END)
    img2_entry.delete(0, tk.END)

# Initialize window
characters = load_characters()
root = tk.Tk()
root.title("Character Editor")

# Character dropdown
tk.Label(root, text="Select Character:").grid(row=0, column=0, sticky='w')
char_var = tk.StringVar(root)
char_dropdown = tk.OptionMenu(root, char_var, *sorted(characters.keys()), command=load_selected_character)
char_dropdown.grid(row=0, column=1, columnspan=2, sticky='we')

# Input fields
tk.Label(root, text="Name:").grid(row=1, column=0, sticky='w')
name_entry = tk.Entry(root, width=50)
name_entry.grid(row=1, column=1, columnspan=2)

tk.Label(root, text="Image 1 URL:").grid(row=2, column=0, sticky='w')
img1_entry = tk.Entry(root, width=50)
img1_entry.grid(row=2, column=1, columnspan=2)

tk.Label(root, text="Image 2 URL:").grid(row=3, column=0, sticky='w')
img2_entry = tk.Entry(root, width=50)
img2_entry.grid(row=3, column=1, columnspan=2)

# Buttons
tk.Button(root, text="Save Character", command=save_character).grid(row=4, column=1, sticky='e')
tk.Button(root, text="Clear Fields", command=clear_fields).grid(row=4, column=2, sticky='w')

update_dropdown()
root.mainloop()
