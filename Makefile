CXX = clang++
CXXFLAGS = -std=c++17 -Wall -O2 -Isrc

# Check for PostgreSQL libpq in Homebrew or pg_config
PG_CONFIG := $(shell which pg_config 2>/dev/null)
ifneq ($(PG_CONFIG),)
    PG_CFLAGS := $(shell $(PG_CONFIG) --cflags 2>/dev/null) -I$(shell $(PG_CONFIG) --includedir 2>/dev/null)
    PG_LDFLAGS := -L$(shell $(PG_CONFIG) --libdir 2>/dev/null) -lpq
    CXXFLAGS += -DHAVE_LIBPQ $(PG_CFLAGS)
else
    # Check common Homebrew paths on Apple Silicon Mac
    BREW_LIBPQ := /opt/homebrew/opt/libpq
    ifeq ($(wildcard $(BREW_LIBPQ)/include/libpq-fe.h),)
        BREW_LIBPQ := /usr/local/opt/libpq
    endif
    ifneq ($(wildcard $(BREW_LIBPQ)/include/libpq-fe.h),)
        CXXFLAGS += -DHAVE_LIBPQ -I$(BREW_LIBPQ)/include
        PG_LDFLAGS += -L$(BREW_LIBPQ)/lib -lpq
    endif
endif

SRC_COMMON = src/database.cpp src/server.cpp
BIN_DIR = bin

all: directories $(BIN_DIR)/taller27_server $(BIN_DIR)/Taller27

directories:
	@mkdir -p $(BIN_DIR)

# 1. C++ Backend Server CLI
$(BIN_DIR)/taller27_server: src/main.cpp $(SRC_COMMON)
	$(CXX) $(CXXFLAGS) src/main.cpp $(SRC_COMMON) $(PG_LDFLAGS) -lpthread -o $@
	@echo "✓ Servidor C++ compilado en $@"

# 2. Native macOS Cocoa/WebKit Desktop Window Application
$(BIN_DIR)/Taller27: src/mac_app.mm $(SRC_COMMON)
	$(CXX) $(CXXFLAGS) -x objective-c++ -framework Cocoa -framework WebKit src/mac_app.mm $(SRC_COMMON) $(PG_LDFLAGS) -lpthread -o $@
	@echo "✓ Aplicación nativa de macOS compilada en $@"

# Run desktop application
run: $(BIN_DIR)/Taller27
	./$(BIN_DIR)/Taller27

# Run CLI server
run-server: $(BIN_DIR)/taller27_server
	./$(BIN_DIR)/taller27_server 3000

clean:
	rm -rf $(BIN_DIR)
