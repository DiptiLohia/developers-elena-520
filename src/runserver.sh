#!/bin/bash
export FLASK_APP=server/backend.py
export FLASK_DEBUG=1
python3 -m flask run