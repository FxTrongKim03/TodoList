from fastapi.middleware.cors import CORSMiddleware

# Nguồn gốc được phép [cite: 36]
origins = [
    "http://localhost:5173", # Port mặc định của Vite
]

def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"], # Cho phép tất cả methods
        allow_headers=["*"], # Cho phép tất cả headers
    )