export const posts = {
  'what-hitchhikers-taught-me-about-ml': {
    title: 'What Hitchhiker\'s Guide Taught Me About ML',
    date: '2019-07-17',
    content: `
      In Douglas Adams' "The Hitchhiker's Guide to the Galaxy," the supercomputer Deep Thought was asked to calculate the answer to the ultimate question of life, the universe, and everything. After 7.5 million years of computation, it arrived at the answer: 42. The problem? No one knew what the question was.

      This scenario perfectly illustrates several key concepts in machine learning:

      ## 1. The Importance of Problem Definition

      Just like the philosophers who didn't know what question they were asking, many data science projects fail not because of technical limitations, but because of poorly defined problems. Before diving into model building, we need to clearly understand:

      - What problem are we trying to solve?
      - What defines success?
      - Is our data actually relevant to the question?

      ## 2. The Role of Computation Power

      Deep Thought was the most powerful computer ever built, yet its answer was meaningless without context. Similarly, in machine learning:

      - More computing power doesn't automatically mean better results
      - The quality of your data and problem definition matters more than raw computational strength
      - Sometimes simpler models with clear interpretability are more valuable than complex ones

      ## 3. The Value of Domain Knowledge

      The mice in the story (actually pan-dimensional beings) knew they needed to understand the question itself. In ML:

      - Domain expertise is crucial for feature engineering
      - Understanding the business context helps in model selection
      - Interpreting results requires both technical and domain knowledge

      ## 4. The Danger of Overfitting

      Deep Thought's answer of "42" was technically correct but practically useless. This reminds us:

      - A model can be mathematically perfect but practically worthless
      - We need to validate our results in real-world contexts
      - The simplest answer isn't always the best one

      ## Conclusion

      The next time you're starting a machine learning project, remember Deep Thought. Make sure you understand the question before seeking the answer. And sometimes, the most important part of data science isn't finding the answer—it's knowing what question to ask in the first place.

      Don't Panic, and always carry a towel (and a good validation dataset).
    `,
    tags: ['Machine Learning', 'Fun']
  },
  'random-forest-with-h2o': {
    title: 'Random Forest with H2O',
    date: '2017-02-17',
    content: `
      H2O is a powerful open-source platform for machine learning and predictive analytics. Today, we'll explore implementing Random Forest algorithms using H2O, focusing on both the theoretical concepts and practical implementation.

      ## What is H2O?

      H2O is a fast, scalable, open-source machine learning and predictive analytics platform. It's particularly powerful because:

      - It can handle large datasets efficiently
      - It provides a user-friendly interface
      - It integrates well with R, Python, and other tools
      - It offers distributed computing capabilities

      ## Random Forest Overview

      Random Forest is an ensemble learning method that:

      - Constructs multiple decision trees
      - Uses random subsets of features for each tree
      - Combines predictions through voting (classification) or averaging (regression)

      ## Implementation with H2O

      Here's a basic example of implementing Random Forest with H2O:

      \`\`\`r
      # Initialize H2O
      library(h2o)
      h2o.init()

      # Import data
      data <- h2o.importFile("your_data.csv")

      # Split data
      splits <- h2o.splitFrame(data, ratios = 0.8)
      train <- splits[[1]]
      test <- splits[[2]]

      # Train model
      rf_model <- h2o.randomForest(
        x = predictors,
        y = response,
        training_frame = train,
        ntrees = 100,
        max_depth = 20
      )

      # Make predictions
      predictions <- h2o.predict(rf_model, test)
      \`\`\`

      ## Best Practices

      1. Feature Selection
         - Start with domain knowledge
         - Use feature importance metrics
         - Consider dimensionality reduction

      2. Hyperparameter Tuning
         - Number of trees
         - Maximum depth
         - Minimum leaf size
         - Sample rate

      3. Model Evaluation
         - Out-of-bag error
         - Cross-validation
         - Feature importance

      ## Conclusion

      H2O's implementation of Random Forest provides a powerful tool for both classification and regression tasks. Its distributed computing capabilities make it particularly suitable for large-scale applications.

      Remember to always validate your models and consider the computational resources required for your specific use case.
    `,
    tags: ['Machine Learning', 'R', 'H2O']
  },
  'squash-all-commits-on-feature-branch': {
    title: 'Squash All Commits on Feature Branch',
    date: '2022-04-19',
    content: `
      When working on a feature branch, it's common to make multiple commits as you progress. However, before merging into the main branch, you might want to consolidate these commits into a single, clean commit. Here's how to do it effectively.

      ## Why Squash Commits?

      Squashing commits helps:
      - Keep the main branch history clean and meaningful
      - Make code reviews easier
      - Simplify rollbacks if needed
      - Group related changes together

      ## The Process

      Here's the step-by-step process to squash your commits:

      1. First, make sure you're on your feature branch:
      \`\`\`bash
      git checkout feature-branch
      \`\`\`

      2. Find out how many commits you want to squash:
      \`\`\`bash
      git log
      \`\`\`

      3. Start an interactive rebase:
      \`\`\`bash
      git rebase -i HEAD~n  # n is the number of commits to squash
      \`\`\`

      4. In the editor that opens, change 'pick' to 'squash' for all commits except the first one:
      \`\`\`
      pick abc1234 First commit
      squash def5678 Second commit
      squash ghi9012 Third commit
      \`\`\`

      5. Save and close the editor. Another editor will open for the commit message.

      6. Edit the commit message as needed and save.

      ## Best Practices

      - Always squash before merging into main
      - Write clear, descriptive commit messages
      - Test after squashing to ensure everything still works
      - Push with force-with-lease to update remote:
        \`\`\`bash
        git push --force-with-lease origin feature-branch
        \`\`\`

      ## Common Issues and Solutions

      1. Conflicts During Rebase
         - Resolve conflicts manually
         - Continue with \`git rebase --continue\`
         - Or abort with \`git rebase --abort\`

      2. Lost Commits
         - Use \`git reflog\` to find and recover commits
         - Always create a backup branch before squashing

      ## Conclusion

      Squashing commits is a powerful way to maintain a clean git history. Just remember to:
      - Only squash commits that haven't been shared
      - Write meaningful commit messages
      - Test your code after squashing
      - Use force-with-lease when pushing
    `,
    tags: ['Git', 'Tutorial']
  }
}

export function getPost(slug: string) {
  return posts[slug as keyof typeof posts]
}

export function getAllPosts() {
  return Object.entries(posts).map(([slug, post]) => ({
    slug,
    ...post
  }))
} 