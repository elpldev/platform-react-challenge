# Cat Lover App
## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```
This will start the development server at http://localhost:5173

### Running Tests
```bash
npm run test
```

For watching mode during development:
```bash
npm run test:watch
```

## Tech Stack

### Core Technologies
- **React 19**: Component Based UI
- **TypeScript**: For type checking
- **Vite**: Chosen as the build tool for its quick set up and fast development exeperience 
- **React Router v7**: Chosen for client side routing with the latest features for navigation and URL parameter handling

### Styling Approach
- **Pure CSS**: Chose vanilla CSS over CSS frameworks for a lightweight bundle and put some effort on this field 

### API Integration
- **Axios**: Used for HTTP requests to the api

## Testing
- **Jest**: As the test runner and assertion library
- **React Testing Library**: For component testing 
- **Axios Mock Adapter**: For mocking API calls in tests

## Future Improvements
- **Responsive design**: Currently, the application is not working perfectly on mobile. If I had additional time I would improve that.
- **CSS Extraction to Variables**: A lot more work could be done on this field, create more variables which then used across the application.
- **Improving test coverage**: Whilst the current test suite include a couple tests. If I had more time I would add more tests for edge cases and integration points.
- **Improve Performance**: Techniques like lazy loading and pagination could be implemented to ensure only necessary files are being downloaded.
- **FolderStructure**: The current folder structure is basic given the size of the application, different approaches like Atomic design or Feature based could be used.

## Thank you!