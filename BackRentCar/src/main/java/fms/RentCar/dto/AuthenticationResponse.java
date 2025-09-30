package fms.RentCar.dto;


import fms.RentCar.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {

    private UserRole userRole;

    private Long userId;


}
