import json
import os
import tkinter as tk
from tkinter import messagebox, scrolledtext

FILE_PATH = 'tips.json'

def load_tips():
    if os.path.exists(FILE_PATH):
        with open(FILE_PATH, 'r', encoding='utf-8') as file:
            return json.load(file)
    return {}

def save_tips(tips):
    with open(FILE_PATH, 'w', encoding='utf-8') as file:
        json.dump(tips, file, indent=2, ensure_ascii=False)

def load_tip_into_fields(event=None):
    tip_key = tip_title_entry.get().strip()
    tip = tips_data.get(tip_key, {})

    content_text.delete(1.0, tk.END)
    pro_tip_text.delete(1.0, tk.END)

    if tip:
        content_text.insert(tk.END, tip.get("Content", ""))
        pro_tip_text.insert(tk.END, tip.get("Pro Tip", ""))
    else:
        content_text.insert(tk.END, "")
        pro_tip_text.insert(tk.END, "")

def save_tip():
    tip_key = tip_title_entry.get().strip()
    content = content_text.get(1.0, tk.END).strip()
    pro_tip = pro_tip_text.get(1.0, tk.END).strip()

    if not tip_key or not content:
        messagebox.showwarning("Missing Data", "Tip title and content are required.")
        return

    tips_data[tip_key] = {
        "name": tip_key,
        "Content": content
    }

    if pro_tip:
        tips_data[tip_key]["Pro Tip"] = pro_tip

    save_tips(tips_data)
    messagebox.showinfo("Saved", f"Tip '{tip_key}' saved successfully!")

    if tip_key not in tip_listbox.get(0, tk.END):
        tip_listbox.insert(tk.END, tip_key)

def on_listbox_select(event):
    selection = event.widget.curselection()
    if selection:
        selected_tip = event.widget.get(selection[0])
        tip_title_entry.delete(0, tk.END)
        tip_title_entry.insert(0, selected_tip)
        load_tip_into_fields()

# Load data
tips_data = load_tips()

# UI setup
root = tk.Tk()
root.title("Tips Editor")
root.geometry("800x600")

# Tip List
tip_listbox = tk.Listbox(root, width=30)
tip_listbox.pack(side=tk.LEFT, fill=tk.Y, padx=(10, 0), pady=10)
for tip_name in tips_data.keys():
    tip_listbox.insert(tk.END, tip_name)
tip_listbox.bind("<<ListboxSelect>>", on_listbox_select)

# Right pane
form_frame = tk.Frame(root)
form_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

tk.Label(form_frame, text="Tip Title:").pack(anchor='w')
tip_title_entry = tk.Entry(form_frame, width=50)
tip_title_entry.pack(fill=tk.X, pady=2)

tk.Label(form_frame, text="Content:").pack(anchor='w')
content_text = scrolledtext.ScrolledText(form_frame, height=10)
content_text.pack(fill=tk.BOTH, expand=True, pady=5)

tk.Label(form_frame, text="Pro Tip (optional):").pack(anchor='w')
pro_tip_text = scrolledtext.ScrolledText(form_frame, height=6)
pro_tip_text.pack(fill=tk.BOTH, expand=True, pady=5)

save_button = tk.Button(form_frame, text="Save Tip", command=save_tip, bg="lightblue")
save_button.pack(pady=10)

root.mainloop()
