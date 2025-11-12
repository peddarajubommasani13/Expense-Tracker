# **My Expense Tracker Website**

## **Project Overview**

**My Expense Tracker** is a **personal finance web application** that allows users to **track their income and expenses** in real-time. The website is **fully responsive**, works on desktop and mobile, and stores all transactions **locally in the browser** using `localStorage`, ensuring that your data persists even after refreshing the page.

This project is inspired by a similar GitHub project but is **customized, organized, and fully structured** as a real website.

---

## **Features**

1. **Track Income & Expenses**

   * Add income and expense transactions.
   * Enter description, amount, and category for each transaction.

2. **View Balance & Summary**

   * Displays your total balance.
   * Shows total income and total expense separately.

3. **Transaction History**

   * List of all transactions with delete option.
   * Categories are displayed for better clarity (Food, Travel, Bills, Shopping, General).

4. **Persistent Storage**

   * Transactions are saved in the browser using `localStorage`.
   * Data is retained even after page reload or browser restart.

5. **Website Structure**

   * Home page with project introduction.
   * Tracker page to add/manage transactions.
   * About page explaining the project.

6. **Responsive & Clean Design**

   * Modern layout using CSS.
   * Works on desktop, tablet, and mobile screens.

---

## **Project Structure**

```
expense-tracker-website/
│
├── index.html          # Homepage
├── tracker.html        # Expense Tracker page
├── about.html          # About page
│
├── styles/
│   └── style.css       # Common CSS for all pages
│
├── scripts/
│   └── tracker.js      # JS logic for tracker
│
└── assets/             # Optional folder for images/icons
```

---

## **How It Works**

1. **Add Transaction**

   * Enter description, amount, and choose a category.
   * Click **Add Transaction** to save it.

2. **View Balance**

   * The **balance** automatically updates based on income (+) and expense (-).
   * Total **income** and **expense** are shown separately for clarity.

3. **Delete Transaction**

   * Click the **red “x” button** next to a transaction to remove it.
   * The balance and totals automatically update.

4. **Persistence**

   * All transactions are saved in the browser’s `localStorage`.
   * Reloading or closing the browser **does not delete your data**.

---

## **How to Run the Project Locally**

1. **Clone the repository**

   ```bash
   git clone https://github.com/YourUsername/expense-tracker-website.git
   ```

2. **Open the project folder**
   Navigate to the project folder on your computer.

3. **Run in Browser**

   * Double-click `index.html` to open in your default web browser.
   * Or use a live server extension in VS Code for live reload.

4. **Start Tracking**

   * Click **Start Tracking** on the home page to go to the tracker page.
   * Add your transactions and watch your balance update in real-time.

---

## **Technologies Used**

* **HTML5** – Structure of the website
* **CSS3** – Styling and responsive design
* **JavaScript** – Logic for adding/removing transactions and calculating balance
* **localStorage** – Persistent storage of transactions in the browser

---



## **Future Enhancements**

* **Dashboard with Charts** – Show visual representation of income vs expense by category.
* **User Authentication** – Allow multiple users to track transactions separately.
* **Export/Import Data** – CSV export or JSON backup of transactions.
* **Advanced Filtering** – Filter transactions by date, category, or amount.

---


## **License**

This project is open-source and free to use. Feel free to fork and modify it for personal or educational purposes.

---


