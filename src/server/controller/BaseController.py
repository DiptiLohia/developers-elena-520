from abc import ABC, abstractmethod


class BaseController(ABC):
    def __init__(self):
        self.model = None  # Reference to the model object
        self.observer = None  # Reference to the observer object
        self.strategy = None  # Reference to the elevation strategy object

    @abstractmethod
    def set_route_model(self, model):
        """
        Set the model object for the controller.
        Args:model: The model object to be set.
        """
        pass

    @abstractmethod
    def set_elevation_strategy(self, strategy):
        """
        Set the elevation strategy for the controller.
        Args:strategy: The elevation strategy object to be set.
        """
        pass

    @abstractmethod
    def manipulate_route_model(self):
        """
        Manipulate the route model based on the implemented logic.
        """
        pass
