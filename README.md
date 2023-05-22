# EleNa : Elevation Based Navigation System
## by the Developers

### Team Members
```
Pranav Jain
Shubham Patel
Dipti Lohia
Neeharika Karanam	
```

# Setup Instructions

Python is required to run the EleNa application. If Python is not already installed on your system, you can download it from the official Python website at `https://www.python.org/downloads/`.
If pip is not installed, you can download the get-pip.py script from the official pip website at `https://pip.pypa.io/en/stable/installing/`.
After installing pip, you can use it to install the required dependencies for EleNa by follwing the steps below:

### Installing Dependencies
To install the required dependencies, use the following command with pip:
```
pip install -r requirements.txt
```

# Running the Application

### Launching the Application
1. Open the terminal and navigate to the client folder.
2. Install the necessary dependencies by running the following command:
```
npm install
```
3. Once the client application is running, open a new terminal window/tab and navigate to the ```src``` directory.
4. Run the server-side script by executing the following command:
```
./run_server.sh
```
5. The Flask app will now be started and running and you can check that on `http://localhost:5000`.
6. You can access the client application by opening your web browser and going to `http://localhost:3000` or `http://127.0.0.1:3000`.

# Input Options

### Enter the Fields to get the path

- Enter the origin address in the `Enter Source` text box(e.g., Umass police department).
- Enter the destination address in the `Enter Destination` text box (e.g., Umass Amherst).

### Path Limit
You can specify the path limit as a percentage of the shortest distance you want to minimize or maximize.

- Enter the path limit percentage (without %) in the "Path Limit" text box on the left side "Input" panel (e.g., 50).

### Elevation Strategy
There are two elevation strategies available:

```Minimize Elevation```: This selects the strategy to minimize the elevation.
```Maximize Elevation```: This selects the strategy to maximize the elevation.

### Algorithm Selection
You can choose between two algorithms:

- ```Dijkstra Algorithm``` : This selects the Dijkstra algorithm for route computation.
- ```A* Algorithm```: This selects the A* algorithm for route computation.

# Adding Input Steps

### Entering Inputs
- Enter the origin address in the designated text box labeled as `Enter Origin` located in the upper middle section of the page(For eg: Umass police department)
- Enter the origin address in the designated text box labeled as `Enter Destination` located in the upper middle section of the page(For eg: Umass amherst)
- Select the elevation strategy `Choose one of the elevations` by choosing either `Minimize Elevation` or `Maximize Elevation` from the radio buttons available in the input section located at the top-middle of the page.
- Select the desired algorithm `Choose one of the algorithms` (`A* Algorithm` or `Dijkstra Algorithm`) by choosing the corresponding option from the radio buttons in the input section located in the upper middle part of the page.
- Click on `Submit` button to submit the request to the system

### Reset Fields
The `Reset` button resets the user interface to its default settings.

# Documentation

### Evaluation and Design Report
- You can find the detailed evaluation and design document at ```Evaluation and Design Document```.pdf.

### White Box testing
- ```UI Testing Report```

### Automated testing using unit-test framework
- Go to test directory and run the files `MVCTestSuite.py` and `AlgorithmTestSuite.py`

### Console Logs
Console logs provide access to valuable information, including metrics for the shortest route and elevation route, as well as details about the requests and responses.
