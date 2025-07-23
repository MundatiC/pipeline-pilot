# pipeline-pilot 🌌☀️

A responsive, interactive portfolio page with theme toggling (dark/light modes) and delightful animations. Serves as both a showcase of frontend skills and a CI/CD pipeline example.

![Demo GIF - Placeholder](demo.gif)

## Features ✨

- **Theme Switching**: Toggle between cosmic dark mode and stellar light mode
- **Interactive Elements**: 
  - 3D-tilt cards that follow cursor
  - Confetti celebration effect
  - Smooth animations and transitions
- **Responsive Design**: Works on all device sizes
- **CI/CD Pipeline**: Automated deployment to GitHub Pages

## CI/CD Pipeline 🛠️

This project demonstrates GitHub Actions CI/CD with this workflow:

```yaml
name: Deploy Static HTML and CSS to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        
      - name: Display files
        run: ls
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

The pipeline:
1. Triggers on pushes to `main` branch
2. Checks out repository code
3. Deploys the static site to GitHub Pages

## Technologies Used 💻

- HTML5 & CSS3 (with CSS Variables for theming)
- JavaScript (ES6+)
- GitHub Actions (CI/CD)
- Animate.css for animations
- Google Fonts (Poppins and Fredoka One)

## How to Use 🚀

1. **Live Demo**: [View on GitHub Pages](https://mundatic.github.io/pipeline-pilot/)
2. **Local Development**:
   ```bash
   git clone https://github.com/MundatiC/pipeline-pilot.git
   cd pipeline-pilot
   open index.html
   ```

## Future Improvements 🔮

- [ ] Add more interactive elements
- [ ] Implement theme persistence with localStorage
- [ ] Add project showcase section
- [ ] Enhance mobile animations

## License 📄

MIT License - see [LICENSE](LICENSE) file for details