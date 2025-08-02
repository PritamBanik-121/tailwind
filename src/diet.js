const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

// Toggle nav on menu button click
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('hidden');
});

// Close nav when a link is clicked (on small screens)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 640) {
      navLinks.classList.add('hidden');
    }
  });
});

// Close nav when clicking outside on small screens
document.addEventListener('click', function (event) {
  if (
    window.innerWidth < 640 &&
    !navLinks.classList.contains('hidden') &&
    !navLinks.contains(event.target) &&
    event.target !== menuBtn &&
    !menuBtn.contains(event.target)
  ) {
    navLinks.classList.add('hidden');
  }
});

class DietPlanner {
    constructor() {
        this.form = document.getElementById('dietForm');
        this.goalButtons = document.querySelectorAll('.goal-btn');
        this.goalInput = document.getElementById('goal');
        this.formSection = document.getElementById('formSection');
        this.resultsSection = document.getElementById('resultsSection');
        
        this.initializeEventListeners();
        this.initializeGoalButtons();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    initializeGoalButtons() {
        this.goalButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                this.goalButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                // Set hidden input value
                this.goalInput.value = button.dataset.goal;
            });
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading"></div> Generating...';
        submitBtn.disabled = true;

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const results = this.calculateDietPlan(data);
            this.displayResults(results);
        } catch (error) {
            alert('Error generating diet plan. Please try again.');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    calculateDietPlan(data) {
        const weight = parseFloat(data.weight);
        const height = parseFloat(data.height);
        const age = parseFloat(data.age);
        const gender = data.gender;
        const activity = parseFloat(data.activity);
        const goal = data.goal;

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Calculate TDEE
        const tdee = bmr * activity;

        // Calculate target calories based on goal
        let targetCalories;
        let goalDescription;
        switch (goal) {
            case 'lose':
                targetCalories = tdee - 500;
                goalDescription = 'Weight Loss';
                break;
            case 'gain':
                targetCalories = tdee + 500;
                goalDescription = 'Weight Gain';
                break;
            default:
                targetCalories = tdee;
                goalDescription = 'Weight Maintenance';
        }

        // Calculate macronutrients
        const protein = (targetCalories * 0.25) / 4; // 25% protein, 4 cal/g
        const carbs = (targetCalories * 0.45) / 4;   // 45% carbs, 4 cal/g
        const fats = (targetCalories * 0.30) / 9;    // 30% fats, 9 cal/g

        // Calculate BMI
        const bmi = weight / ((height / 100) ** 2);
        let bmiCategory;
        if (bmi < 18.5) bmiCategory = 'Underweight';
        else if (bmi < 25) bmiCategory = 'Normal weight';
        else if (bmi < 30) bmiCategory = 'Overweight';
        else bmiCategory = 'Obese';

        return {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            targetCalories: Math.round(targetCalories),
            goalDescription,
            protein: Math.round(protein),
            carbs: Math.round(carbs),
            fats: Math.round(fats),
            bmi: bmi.toFixed(1),
            bmiCategory,
            mealPlan: this.generateMealPlan(targetCalories, goal)
        };
    }

    generateMealPlan(calories, goal) {
        const mealPlans = {
            lose: {
                breakfast: [
                    'Oatmeal with berries and almonds (300 cal)',
                    'Greek yogurt with honey (150 cal)',
                    'Green tea (0 cal)'
                ],
                lunch: [
                    'Grilled chicken salad with olive oil dressing (400 cal)',
                    'Mixed vegetables (100 cal)',
                    'Brown rice (150 cal)'
                ],
                snack: [
                    'Apple with peanut butter (200 cal)',
                    'Handful of nuts (150 cal)'
                ],
                dinner: [
                    'Baked fish with herbs (250 cal)',
                    'Steamed broccoli (50 cal)',
                    'Sweet potato (150 cal)'
                ]
            },
            gain: {
                breakfast: [
                    'Whole grain toast with avocado (350 cal)',
                    'Scrambled eggs (200 cal)',
                    'Banana smoothie with protein powder (300 cal)'
                ],
                lunch: [
                    'Chicken rice bowl with vegetables (600 cal)',
                    'Quinoa salad (200 cal)',
                    'Whole milk (150 cal)'
                ],
                snack: [
                    'Trail mix with dried fruits (300 cal)',
                    'Protein bar (250 cal)'
                ],
                dinner: [
                    'Salmon with olive oil (400 cal)',
                    'Brown rice (200 cal)',
                    'Mixed vegetables with butter (150 cal)'
                ]
            },
            maintain: {
                breakfast: [
                    'Whole grain cereal with milk (250 cal)',
                    'Banana (100 cal)',
                    'Orange juice (100 cal)'
                ],
                lunch: [
                    'Turkey sandwich on whole grain bread (450 cal)',
                    'Side salad with dressing (100 cal)',
                    'Apple (80 cal)'
                ],
                snack: [
                    'Greek yogurt with granola (200 cal)',
                    'Mixed berries (50 cal)'
                ],
                dinner: [
                    'Grilled chicken breast (300 cal)',
                    'Quinoa (150 cal)',
                    'Roasted vegetables (100 cal)'
                ]
            }
        };

        return mealPlans[goal] || mealPlans.maintain;
    }

    displayResults(results) {
        // Hide form and show results
        this.formSection.style.display = 'none';
        this.resultsSection.style.display = 'block';

        // Update stats grid
        const statsGrid = document.getElementById('statsGrid');
        statsGrid.innerHTML = `
            <div class="stat-card">
                <i class="fas fa-fire"></i>
                <h3>${results.targetCalories}</h3>
                <p>Daily Calories</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-calculator"></i>
                <h3>${results.bmi}</h3>
                <p>BMI (${results.bmiCategory})</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-drumstick-bite"></i>
                <h3>${results.protein}g</h3>
                <p>Daily Protein</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-bread-slice"></i>
                <h3>${results.carbs}g</h3>
                <p>Daily Carbs</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-cheese"></i>
                <h3>${results.fats}g</h3>
                <p>Daily Fats</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-target"></i>
                <h3>${results.goalDescription}</h3>
                <p>Your Goal</p>
            </div>
        `;

        // Update meal plan
        const mealPlan = document.getElementById('mealPlan');
        mealPlan.innerHTML = `
            <div class="meal-card">
                <h3><i class="fas fa-sun"></i> Breakfast</h3>
                <ul>
                    ${results.mealPlan.breakfast.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="meal-card">
                <h3><i class="fas fa-cloud-sun"></i> Lunch</h3>
                <ul>
                    ${results.mealPlan.lunch.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="meal-card">
                <h3><i class="fas fa-apple-alt"></i> Snack</h3>
                <ul>
                    ${results.mealPlan.snack.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="meal-card">
                <h3><i class="fas fa-moon"></i> Dinner</h3>
                <ul>
                    ${results.mealPlan.dinner.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;

        // Scroll to results
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showForm() {
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DietPlanner();
});
