from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.trading import router as trading_router

# Create FastAPI instance
app = FastAPI(
    title="AI Investment Agent API",
    description="An AI-powered system that provides trading signals.",
    version="1.0.0",
)

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to restrict specific domains in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Include API Routes
app.include_router(trading_router)

# Root endpoint
@app.get("/", tags=["Health Check"])
def root():
    return {"message": "AI Investment Agent API is running!"}

# Run FastAPI with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
