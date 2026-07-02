module com.fucar {
    requires javafx.controls;
    requires javafx.fxml;

    opens com.fucar to javafx.fxml;
    opens com.fucar.controller to javafx.fxml;
    opens com.fucar.model to javafx.base;

    exports com.fucar;
    exports com.fucar.controller;
    exports com.fucar.model;
}
