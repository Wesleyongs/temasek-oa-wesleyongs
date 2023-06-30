# Makefile for Windows Python FastAPI application

# Virtual environment settings
VENV_NAME := venv
VENV_ACTIVATE := $(VENV_NAME)\Scripts\activate.bat

# Install dependencies from requirements.txt
install:
	$(VENV_ACTIVATE) && pip install -r requirements.txt

# Create the virtual environment
venv:
	python -m venv $(VENV_NAME)

# Activate the virtual environment
activate:
	@echo "Activating virtual environment..."
	@cmd /K "$(VENV_ACTIVATE)"

# Clean up the project directory
clean:
	@echo "Cleaning up..."
	@del /F /Q *.pyc
	@rmdir /S /Q __pycache__
	@echo "Cleanup complete."

# Run the FastAPI application
run:
	$(VENV_ACTIVATE) && python -m src.main

# Additional commands
# ...

# Default target
all: install

.PHONY: install venv activate clean run
