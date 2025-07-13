# Checkout Flow Documentation

Welcome to the **Checkout** section! This guide explains how the booking and checkout process works on our platform, in simple terms. You’ll also see easy-to-follow examples and pseudo-code to help you understand what happens behind the scenes.

---

## 1. How the Booking Flow Works

The checkout process is like a step-by-step wizard. Here’s what happens:

1. **Choose a Cleaning Type**
   - Example: Regular Cleaning, Deep Cleaning, End of Tenancy, etc.
   - _You pick the type that fits your needs._

2. **Select Frequency**
   - Example: Weekly, Fortnightly, Monthly, or One-Off (just once).
   - _You decide how often you want the service._

3. **Pick a Date and Time**
   - _You choose when you want the cleaning to happen._

4. **Add Extras (Optional)**
   - Example: Eco-friendly products, Disinfection, Laundry, etc.
   - _You can add extra services if you want._

5. **Enter Your Details**
   - Name, address, phone, and any special instructions.

6. **Review and Confirm**
   - _You see a summary and the total price before confirming your booking._

---

## 2. How Your Selections Are Stored

- As you make choices, the system remembers them in a “store” (like a shopping cart).
- This store keeps track of:
  - What type of cleaning you picked
  - How often you want it
  - The date and time
  - Any extras
  - Your personal details

**Pseudo-code Example:**
```pseudo
When you select a cleaning type:
    Store.selectedType = your choice

When you pick a date:
    Store.selectedDate = your chosen date
```

---

## 3. How Pricing is Calculated

- The system uses a set of rules to calculate your price.
- The price depends on:
  - Type of cleaning
  - Frequency (discounts for regular bookings)
  - Extras you add
  - How many rooms or add-ons you select
  - The level of dirtiness (light, medium, heavy)

**Pseudo-code Example:**
```pseudo
Base price = hourly rate × number of hours
If you choose weekly cleaning:
    Apply a discount to the base price
Add the cost of any extras you selected
If you select "heavy dirt level":
    Increase the price by a multiplier
Show you the final total
```

---

## 4. Example Booking Flow

Let’s walk through a simple example:

1. **You pick:**
   - Cleaning Type: Regular
   - Frequency: Weekly
   - Date: Next Monday at 10:00 AM
   - Extras: Eco-friendly, Disinfection
   - Rooms: 2 bedrooms, 1 bathroom

2. **The system does:**
```pseudo
Store.selectedType = "Regular"
Store.selectedFrequency = "Weekly"
Store.selectedDate = next Monday
Store.hour = 10
Store.minute = 0
Store.selectedAddOns = { ecoFriendly: true, disinfection: true }
Store.roomCounts = { bedroom: 2, bathroom: 1 }
```

3. **Price Calculation:**
```pseudo
Base = hourly rate × hours (based on rooms)
Apply weekly discount
Add cost for eco-friendly and disinfection
Show you the total price
```

---

## 5. What Happens When You Change Something?

- If you change the date or add an extra, the system instantly updates the price and summary.
- You always see the latest total before you confirm.

**Pseudo-code Example:**
```pseudo
When you change any selection:
    Recalculate the price
    Update the summary on the screen
```

---

## 6. Need Help?

If you have questions or need help, just ask our support team. We’re here to make your booking experience easy and clear!

---

*This documentation is designed for everyone, no technical knowledge required!* 