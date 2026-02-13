// Problem definitions with multi-pass refinement chains
const PROBLEMS = {
    'code-review': {
        title: 'Code Review (Find Bugs)',
        description: 'Review Python function for correctness and best practices',
        passes: [
            {
                output: `def calculate_average(numbers):
    total = 0
    for n in numbers:
        total += n
    average = total / len(numbers)
    return average

# Example: calculate_average([1, 2, 3, 4]) returns 2.5
# BUG: Crashes if numbers is empty
# BUG: No type hints
# BUG: No docstring`,
                critique: `Issues identified:
• Division by zero: crashes if numbers list is empty
• Missing type hints: reduces code clarity and IDE support
• No docstring: unclear what function does, no parameter/return docs
• No error handling: should validate input`,
                clarity: 35,
                correctness: 30,
                structure: 40,
                errors: 4
            },
            {
                output: `def calculate_average(numbers: list) -> float:
    """Calculate the average of a list of numbers.
    
    Args:
        numbers: List of numbers to average
        
    Returns:
        float: The average value
    """
    if not numbers:
        raise ValueError("Cannot average empty list")
    
    total = 0
    for n in numbers:
        total += n
    average = total / len(numbers)
    return average`,
                critique: `Improvements made:
✓ Added type hints
✓ Added comprehensive docstring
✓ Added empty list check with error

Remaining issues:
• Could use sum() built-in instead of loop
• No input validation for non-numeric values`,
                clarity: 75,
                correctness: 90,
                structure: 80,
                errors: 2
            },
            {
                output: `def calculate_average(numbers: list[float]) -> float:
    """Calculate the average of a list of numbers.
    
    Args:
        numbers: List of numeric values
        
    Returns:
        float: The average value
        
    Raises:
        ValueError: If numbers list is empty or contains non-numeric values
    """
    if not numbers:
        raise ValueError("Cannot average empty list")
    
    try:
        total = sum(numbers)
        average = total / len(numbers)
        return average
    except TypeError:
        raise ValueError("All values must be numeric")`,
                critique: `Additional improvements:
✓ Used sum() built-in (cleaner, more efficient)
✓ Added input validation for non-numeric values
✓ Updated type hints to be more specific (list[float])
✓ Documented all exceptions raised

Minor enhancements possible:
• Could add example usage in docstring`,
                clarity: 95,
                correctness: 98,
                structure: 95,
                errors: 1
            },
            {
                output: `def calculate_average(numbers: list[float]) -> float:
    """Calculate the average of a list of numbers.
    
    Args:
        numbers: List of numeric values
        
    Returns:
        float: The average value
        
    Raises:
        ValueError: If numbers list is empty or contains non-numeric values
        
    Example:
        >>> calculate_average([1.0, 2.0, 3.0, 4.0])
        2.5
    """
    if not numbers:
        raise ValueError("Cannot average empty list")
    
    try:
        total = sum(numbers)
        average = total / len(numbers)
        return average
    except TypeError as e:
        raise ValueError("All values must be numeric") from e`,
                critique: `Final polish:
✓ Added usage example in docstring
✓ Improved error chaining with 'from e'
✓ Code is now production-ready
✓ Follows PEP 8 standards`,
                clarity: 100,
                correctness: 100,
                structure: 100,
                errors: 0
            }
        ]
    },
    'essay': {
        title: 'Essay Quality (Improve Clarity)',
        description: 'Refine an essay for clarity, structure, and conciseness',
        passes: [
            {
                output: `Climate change is a big problem. It's happening because of greenhouse gases. These gases trap heat. The temperature is going up. This causes many problems. Ice melts. Sea levels rise. Weather gets worse. Animals lose homes. Humans need to do something.`,
                critique: `Issues:
• Vague and repetitive ("big problem", "many problems")
• Choppy sentences, no flow between ideas
• No specific examples or data
• No clear argument structure
• Weak conclusion`,
                clarity: 35,
                correctness: 50,
                structure: 25,
                errors: 5
            },
            {
                output: `Climate change, driven by greenhouse gas emissions, represents one of humanity's greatest challenges. These gases trap heat in the atmosphere, causing global temperatures to rise. The consequences are far-reaching: polar ice sheets are melting, sea levels are rising, extreme weather events are intensifying, and ecosystems worldwide are destabilizing. Without immediate action, millions of species and communities face existential threats.`,
                critique: `Improvements:
✓ Stronger opening with specific cause-effect
✓ Better sentence flow and connection
✓ More concrete consequences listed
✓ Clear statement of stakes

Gaps:
• Missing specific data/numbers
• No mention of human solutions
• Could strengthen call-to-action`,
                clarity: 85,
                correctness: 85,
                structure: 80,
                errors: 2
            },
            {
                output: `Climate change, accelerated by greenhouse gas emissions, represents humanity's defining challenge. Rising atmospheric CO₂ concentrations trap heat, elevating global temperatures by approximately 1.1°C since pre-industrial times. This warming triggers cascading consequences: Greenland's ice sheet loses ~280 billion tons annually, sea levels rise 3.4mm per year, and extreme weather events occur 5x more frequently than a century ago. Coral reefs face bleaching, agricultural yields decline, and displacement threatens 200+ million people by 2050.

Addressing this crisis requires rapid transitions to renewable energy, forest conservation, and systemic policy reforms.`,
                critique: `Significantly strengthened:
✓ Quantified impacts with real data
✓ Clear cause-effect chain
✓ Specific timeline and scale
✓ Mentions solutions
✓ Builds logical argument

Minor refinements:
• Could specify which policies matter most`,
                clarity: 95,
                correctness: 95,
                structure: 92,
                errors: 0
            },
            {
                output: `Climate change, accelerated by greenhouse gas emissions, represents humanity's defining challenge of the 21st century. Rising atmospheric CO₂ concentrations—now exceeding 420 ppm—trap heat and elevate global temperatures by approximately 1.1°C since pre-industrial times. This warming triggers cascading, measurable consequences: Greenland's ice sheet loses ~280 billion tons annually, sea levels rise 3.4mm per year, and extreme weather events occur 5x more frequently than a century ago. Vulnerable populations face mounting crises: coral reef ecosystems face bleaching, agricultural yields decline, and climate displacement threatens 200+ million people by 2050.

Averting catastrophe requires rapid, coordinated action: transitioning to renewable energy, conserving forests, implementing carbon pricing, and supporting climate adaptation in vulnerable nations. The cost of inaction far exceeds investment today.`,
                critique: `Final refinement:
✓ Added specific atmospheric CO₂ level
✓ Clarified "cascading, measurable" for emphasis
✓ Structured solutions with concrete policies
✓ Added economic argument (cost comparison)
✓ Professional, publication-ready tone`,
                clarity: 100,
                correctness: 100,
                structure: 100,
                errors: 0
            }
        ]
    },
    'math': {
        title: 'Math Problem (Check Steps)',
        description: 'Solve and verify a quadratic equation',
        passes: [
            {
                output: `Solve: x² + 5x + 6 = 0

x² + 5x + 6 = 0
x = 2 or x = 3

Check: 2² + 5(2) + 6 = 4 + 10 + 6 = 20 ≠ 0 (WRONG)`,
                critique: `Critical errors:
• Solutions are incorrect (verification shows x=2 doesn't work)
• No method shown (guessing?)
• Factoring not attempted
• Answer contradicts verification`,
                clarity: 30,
                correctness: 15,
                structure: 40,
                errors: 4
            },
            {
                output: `Solve: x² + 5x + 6 = 0

Factor: (x + 2)(x + 3) = 0
Solutions: x = -2 or x = -3

Verify x = -2:
(-2)² + 5(-2) + 6 = 4 - 10 + 6 = 0 ✓

Verify x = -3:
(-3)² + 5(-3) + 6 = 9 - 15 + 6 = 0 ✓`,
                critique: `Major improvement:
✓ Correct solutions: x = -2, x = -3
✓ Clear factoring method
✓ Both solutions verified
✓ Checks show correctness

Could enhance:
• Show quadratic formula as alternative
• Explain why factoring works here`,
                clarity: 90,
                correctness: 100,
                structure: 85,
                errors: 0
            },
            {
                output: `Solve: x² + 5x + 6 = 0

Method 1: Factoring
We need two numbers that multiply to 6 and add to 5: (2, 3)
Factor: (x + 2)(x + 3) = 0
Solutions: x = -2 or x = -3

Verification (x = -2):
(-2)² + 5(-2) + 6 = 4 - 10 + 6 = 0 ✓

Method 2: Quadratic Formula
x = (-b ± √(b² - 4ac)) / 2a, where a=1, b=5, c=6
x = (-5 ± √(25 - 24)) / 2
x = (-5 ± 1) / 2
x = -2 or x = -3 ✓

Discriminant (b² - 4ac = 1 > 0): Two distinct real solutions confirmed.`,
                critique: `Excellent refinement:
✓ Multiple solution methods shown
✓ Factoring explanation clear
✓ Quadratic formula derived correctly
✓ Discriminant analysis added
✓ Both methods agree

Suggestion for completeness:
• Could graph the parabola visually`,
                clarity: 98,
                correctness: 100,
                structure: 98,
                errors: 0
            },
            {
                output: `Solve: x² + 5x + 6 = 0

Method 1: Factoring
Looking for factors of 6 that add to 5: (2, 3) works
(x + 2)(x + 3) = 0
∴ x = -2 or x = -3

Verification (x = -2): (-2)² + 5(-2) + 6 = 4 - 10 + 6 = 0 ✓

Method 2: Quadratic Formula
For ax² + bx + c = 0: x = (-b ± √(b² - 4ac)) / 2a
With a=1, b=5, c=6:
Discriminant: Δ = b² - 4ac = 25 - 24 = 1 > 0
x = (-5 ± √1) / 2 = (-5 ± 1) / 2
∴ x = -2 or x = -3 ✓

Geometric Interpretation: The parabola y = x² + 5x + 6 crosses the x-axis at x = -2 and x = -3, confirming our solutions.

Solution Set: {-3, -2}`,
                critique: `Perfect solution:
✓ Two rigorous methods
✓ Clear factoring logic
✓ Complete quadratic formula derivation
✓ Discriminant analysis (confirming real solutions)
✓ Geometric context provided
✓ Final answer in set notation

This is publication-ready mathematics.`,
                clarity: 100,
                correctness: 100,
                structure: 100,
                errors: 0
            }
        ]
    },
    'logic': {
        title: 'Logic Puzzle (Verify Solution)',
        description: 'Solve a logic puzzle with multiple constraints',
        passes: [
            {
                output: `Logic Puzzle: Alice, Bob, and Carol each have a pet (dog, cat, rabbit) and a car color (red, blue, green).

Clues:
1. Alice has the red car
2. Bob has the cat
3. Carol has the dog

Solution:
Alice: red car, rabbit
Bob: blue car, cat
Carol: green car, dog`,
                critique: `Issues:
• Assignment incomplete/inconsistent
• Car colors don't match clues properly
• Logic not fully verified
• Missing constraint validation`,
                clarity: 50,
                correctness: 40,
                structure: 50,
                errors: 3
            },
            {
                output: `Logic Puzzle: Three people (Alice, Bob, Carol), three pets (dog, cat, rabbit), three cars (red, blue, green).

Constraints:
1. Alice has the red car
2. Bob has the cat (and not the rabbit)
3. Carol has the dog
4. The rabbit owner has the blue car
5. No person can have two pets

From constraint 1: Alice has red car
From constraint 2: Bob has cat
From constraint 3: Carol has dog
From constraint 4: Rabbit owner has blue car

Since Bob has cat and Alice has red car:
- Alice must have rabbit (only pet left for her)
- Bob has blue car (constraint 4: rabbit owner has blue car... wait, Alice has rabbit)

Solution:
Alice: red car, rabbit
Bob: cat, green car
Carol: dog, blue car

Verification: All constraints satisfied ✓`,
                critique: `Better structured:
✓ Clear constraint listing
✓ Logical deduction shown
✓ Attempts verification
✓ More systematic approach

Logical error found:
• Constraint 4 violated: Alice has rabbit but not blue car
• Carol assigned blue car but has dog (not rabbit)`,
                clarity: 75,
                correctness: 50,
                structure: 80,
                errors: 2
            },
            {
                output: `Logic Puzzle: Three people, three pets, three cars.

Constraints:
1. Alice has the red car
2. Bob has the cat
3. Carol has the dog
4. The rabbit owner has the blue car
5. Each person has exactly one pet and one car

Deduction:
From (2): Bob has cat
From (3): Carol has dog
→ Alice must have rabbit (only pet left)

From (4): Rabbit owner has blue car
→ Alice has blue car (she has rabbit)

But (1) says: Alice has red car
→ CONTRADICTION! Constraint (4) and (1) conflict.

The puzzle as stated is unsolvable. Either:
- Clue 4 should say "cat owner" not "rabbit owner", or
- Clue 1 should say "blue car" not "red car"

If we modify (4) to "cat owner has blue car":
Alice: red car, rabbit
Bob: blue car, cat
Carol: green car, dog
✓ All constraints satisfied`,
                critique: `Excellent analysis:
✓ Identifies logical contradiction
✓ Shows systematic deduction
✓ Acknowledges unsolvability
✓ Proposes correction
✓ Verifies corrected solution

This demonstrates critical thinking.`,
                clarity: 98,
                correctness: 100,
                structure: 98,
                errors: 0
            },
            {
                output: `Logic Puzzle Analysis: Three People, Three Pets, Three Cars

Original Constraints:
1. Alice has the red car
2. Bob has the cat
3. Carol has the dog
4. The rabbit owner has the blue car

Logical Deduction (Assume consistency):
Step 1: Bob = cat (constraint 2), Carol = dog (constraint 3)
Step 2: Therefore, Alice = rabbit (only pet remaining)
Step 3: Alice = rabbit AND rabbit owner has blue car (constraint 4)
        → Alice = blue car
Step 4: But constraint 1 states Alice = red car
        → CONTRADICTION ✗

Conclusion: The puzzle is logically inconsistent. Constraints 1 and 4 cannot both be true.

Possible Resolution A:
Modify constraint 4: "Cat owner has blue car" → Bob has blue car
✓ Alice: red car, rabbit
✓ Bob: blue car, cat
✓ Carol: green car, dog

Possible Resolution B:
Modify constraint 1: "Alice has the blue car" instead of red
✓ Alice: blue car, rabbit
✓ Bob: red or green car, cat
✓ Carol: remaining car, dog

The puzzle teaches: Always verify logical consistency. Seemingly simple constraints can create unsolvable systems if contradictory.`,
                critique: `Perfect logical analysis:
✓ Clearly shows contradiction
✓ Step-by-step deduction
✓ Multiple resolutions provided
✓ Explains the lesson
✓ Demonstrates meta-reasoning

This is what critical problem-solving looks like.`,
                clarity: 100,
                correctness: 100,
                structure: 100,
                errors: 0
            }
        ]
    },
    'writing': {
        title: 'Writing (Fix Tone)',
        description: 'Polish a product review for professionalism and clarity',
        passes: [
            {
                output: `This laptop is really great!!!!! I love it so much. It's super fast and the battery lasts forever. The screen is pretty amazing and the keyboard feels good. I would definitely buy this again. Everyone should get one. It's the best thing ever!!!!`,
                critique: `Problems:
• Excessive exclamation marks (unprofessional)
• Vague descriptions ("super fast", "forever", "pretty amazing")
• Repetitive enthusiasm without specifics
• No balanced perspective (all positives, no tradeoffs)
• Missing concrete details (model, price, use cases)`,
                clarity: 50,
                correctness: 60,
                structure: 40,
                errors: 5
            },
            {
                output: `This laptop delivers excellent performance for professionals and students. The processor handles multitasking smoothly, completing complex tasks in seconds. The 12-hour battery life supports a full workday. The crisp 1440p display with 100% sRGB coverage is ideal for design work. The keyboard offers comfortable, responsive typing.

However, the device is heavier than some competitors, and heat management could improve under sustained load.

Recommendation: Highly recommended for power users who prioritize performance over portability.`,
                critique: `Significant improvements:
✓ Specific technical details (12-hour battery, 1440p, 100% sRGB)
✓ Balanced perspective (pros and cons)
✓ Professional tone
✓ Target audience identified
✓ Clear recommendation

Could enhance:
• Add price-to-performance commentary
• Specify which applications tested`,
                clarity: 90,
                correctness: 90,
                structure: 85,
                errors: 1
            },
            {
                output: `Performance & Design
This laptop excels in performance, featuring an Intel Core i9 processor that handles multitasking and demanding applications with ease. Compiling large codebases and rendering 4K video are completed in reasonable timeframes. The 12-hour battery life supports full-day productivity, tested across web browsing, document editing, and software development.

Build Quality & Display
The 1440p display with 100% sRGB coverage delivers vibrant, accurate colors—essential for photo and video editing. The aluminum chassis feels premium and durable, though at 4.2 lbs, it's heavier than ultrabooks like the MacBook Air.

Tradeoffs
The device experiences thermal throttling during sustained 100% CPU load (rare in daily use). The starting price of $1,899 is premium, positioning it for professionals rather than budget shoppers.

Verdict: Recommended for developers, designers, and content creators prioritizing performance. Not ideal for travel-heavy users.`,
                critique: `Excellent structure and balance:
✓ Organized by category (Performance, Design, Tradeoffs)
✓ Specific use cases tested
✓ Concrete specs (i9, 4.2 lbs, $1,899)
✓ Honest about limitations
✓ Target audience clear
✓ Professional, unbiased tone

Minor suggestion:
• Compare against 1-2 competing models`,
                clarity: 98,
                correctness: 98,
                structure: 96,
                errors: 0
            },
            {
                output: `Performance & Design: Professional Laptop Review
This laptop excels in performance, featuring an Intel Core i9 processor that smoothly handles multitasking and demanding applications. Tested real-world tasks: compiling 50MB codebases (8 sec), rendering 4K video (stable), and parallel CI/CD pipelines. The 12-hour battery supports full-day productivity through web work, document editing, and development.

Build Quality & Display
The 1440p display (100% sRGB) delivers vibrant, color-accurate output—critical for photo/video editing. Aluminum construction feels premium and durable at 4.2 lbs. This weight is 0.8 lbs heavier than the MacBook Air M2, a meaningful difference for frequent travelers.

Performance Tradeoffs & Price
Sustained 100% CPU load causes brief thermal throttling (rare in practice), with fan noise reaching ~45dB. At $1,899, it positions above the MacBook Air M2 ($1,499) but below premium gaming laptops ($2,500+).

Verdict
Highly recommended for developers, designers, and content creators who prioritize performance and build quality. Reserve for desk-based work; ultrabooks better suit travel-heavy workflows.

Rating: 4.5/5 — Excellent performance, premium build; thermal management could improve.`,
                critique: `Publication-ready review:
✓ Benchmarked with concrete numbers
✓ Honest technical analysis
✓ Competitive positioning (MacBook, gaming laptops)
✓ Clear use-case targeting
✓ Specific tradeoff analysis (fan noise dB level)
✓ Numerical rating provided
✓ Balanced and credible tone

This is professional review standard.`,
                clarity: 100,
                correctness: 100,
                structure: 100,
                errors: 0
            }
        ]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PROBLEMS;
}
