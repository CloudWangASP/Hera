#!/bin/bash
SH_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CPP_DIR=$SH_DIR/cpp
em++ -Os -s WASM=1 -s SIDE_MODULE=1 -o $CPP_DIR/rule_fission.wasm $CPP_DIR/rule_fission.cpp
python3 -m http.server