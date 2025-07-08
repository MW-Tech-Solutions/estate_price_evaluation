# Property Pilot - AI-Powered Real Estate Evaluation

Property Pilot is a web application that provides AI-powered property valuations and market analysis. Users can input property details—such as location, size, and amenities—to receive an estimated market price, a generated property description, and a comparison with similar properties in the area. The application focuses on properties within Adamawa State, Nigeria, and displays all prices in Nigerian Naira (NGN).

## Features

- **User Authentication**: Secure login and registration system.
- **AI-Powered Evaluation**: Get instant property valuations using Google's Gemini model.
- **Dynamic Description Generation**: The AI creates compelling property descriptions based on provided details.
- **Market Comparison**: Compares the subject property against mock market data for similar local properties.
- **Dashboard**: A user-friendly interface to input property data and view results.
- **Responsive Design**: Fully responsive layout built with ShadCN UI and Tailwind CSS.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Google Genkit](https://firebase.google.com/docs/genkit) with the Gemini 1.5 Flash model
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   You'll need a Google AI API key for Genkit to work. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Create a local environment file by copying the example:
        ```bash
        cp .env .env.local
        ```
    -   Open the `.env.local` file and add your Google AI API key:
        ```
        GOOGLE_API_KEY=your_google_api_key_here
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:9002](http://localhost:9002).

## Usage

-   Navigate to the registration page to create a new account.
-   Alternatively, use the default credentials to log in:
    -   **Email**: `admin@gmail.com`
    -   **Password**: `password123`
-   Once logged in, you will be redirected to the dashboard where you can start evaluating properties.
