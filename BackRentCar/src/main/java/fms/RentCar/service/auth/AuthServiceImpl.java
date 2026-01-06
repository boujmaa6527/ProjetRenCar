package fms.RentCar.service.auth;


import fms.RentCar.dto.SignupRequest;
import fms.RentCar.dto.UserDTO;
import fms.RentCar.entity.User;
import fms.RentCar.enums.UserRole;
import fms.RentCar.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    @PostConstruct
    public void createAdminAccount() {
        User adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
        if(adminAccount == null){
           User newAdminaccount = new User();
           newAdminaccount.setName("Admin");
           newAdminaccount.setEmail("admin@test.com");
           newAdminaccount.setPassword(
                   new BCryptPasswordEncoder().encode("admin")
           );
           newAdminaccount.setUserRole(UserRole.ADMIN);
           userRepository.save(newAdminaccount);
           System.out.println("Admin account created successfully");
        }else{

        }
    }

    @Override
    public UserDTO createCustomer(SignupRequest signupRequest) {

        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(
                new BCryptPasswordEncoder().encode(signupRequest.getPassword())
        );
        user.setUserRole(UserRole.CUSTOMER);
        User createdUser = userRepository.save(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setId(createdUser.getId());
        return userDTO;
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
