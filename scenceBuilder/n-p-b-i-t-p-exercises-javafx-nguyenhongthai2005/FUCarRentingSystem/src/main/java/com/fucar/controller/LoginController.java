package com.fucar.controller;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.stage.Stage;

import java.io.IOException;

public class LoginController {

    @FXML private TextField     accountNameField;
    @FXML private PasswordField passwordField;
    @FXML private TextField     passwordVisible;
    @FXML private CheckBox      showPasswordCheck;
    @FXML private Label         lblError;
    @FXML private Button        loginBtn;

    @FXML
    public void initialize() {
        lblError.setText("");
        // Đồng bộ 2 field password (PasswordField ẩn ↔ TextField hiện)
        passwordField.textProperty()
            .bindBidirectional(passwordVisible.textProperty());
        // Enter trên passwordField = click Đăng nhập
        passwordField.setOnAction(e -> handleLogin());
        passwordVisible.setOnAction(e -> handleLogin());
    }

    @FXML
    private void handleShowPassword() {
        boolean show = showPasswordCheck.isSelected();
        passwordField.setVisible(!show);
        passwordField.setManaged(!show);
        passwordVisible.setVisible(show);
        passwordVisible.setManaged(show);
    }

    @FXML
    private void handleLogin() {
        String username = accountNameField.getText().trim();
        String password = showPasswordCheck.isSelected()
                        ? passwordVisible.getText()
                        : passwordField.getText();

        if (username.isEmpty() || password.isEmpty()) {
            showError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (username.equals("admin") && password.equals("admin123")) {
            // Đăng nhập thành công -> Chuyển trang
            try {
                loadListView("Chào Admin.");
            } catch (IOException e) {
                e.printStackTrace();
                showError("Lỗi khi tải màn hình danh sách.");
            }
        } else if (username.equals("customer") && password.equals("cust123")) {
            try {
                loadListView("Chào Customer.");
            } catch (IOException e) {
                e.printStackTrace();
                showError("Lỗi khi tải màn hình danh sách.");
            }
        } else {
            showError("Sai tên tài khoản hoặc mật khẩu.");
        }
    }

    private void loadListView(String welcomeMsg) throws IOException {
        // Đóng thông báo chào (tuỳ chọn)
        showAlert(Alert.AlertType.INFORMATION, "Đăng nhập thành công! " + welcomeMsg);

        // Chuyển sang màn hình list-view.fxml
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/com/fucar/list-view.fxml"));
        Parent root = loader.load();
        
        Scene scene = new Scene(root, 600, 420);
        // Load CSS cho scene mới
        scene.getStylesheets().add(getClass().getResource("/com/fucar/style.css").toExternalForm());
        
        // Lấy Stage hiện tại từ loginBtn (hoặc bất kỳ control nào)
        Stage stage = (Stage) loginBtn.getScene().getWindow();
        stage.setScene(scene);
        stage.setTitle("Quản lý Sinh Viên - FUCarRentingSystem");
        stage.show();
    }

    @FXML
    private void handleForgotPassword() {
        showAlert(Alert.AlertType.INFORMATION,
            "Chức năng đang phát triển.");
    }

    private void showError(String msg) {
        lblError.setText("⚠ " + msg);
    }

    private void showAlert(Alert.AlertType type, String msg) {
        new Alert(type, msg, ButtonType.OK).showAndWait();
    }
}
