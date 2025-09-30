package fms.RentCar.service.auth;

import fms.RentCar.dto.SignupRequest;
import fms.RentCar.dto.UserDTO;

public interface AuthService {

    UserDTO createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
