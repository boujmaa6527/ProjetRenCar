package fms.RentCar.controller;


import fms.RentCar.dto.AuthenticationRequest;
import fms.RentCar.dto.AuthenticationResponse;
import fms.RentCar.dto.SignupRequest;
import fms.RentCar.dto.UserDTO;
import fms.RentCar.entity.User;
import fms.RentCar.repository.UserRepository;
import fms.RentCar.service.auth.AuthService;
import fms.RentCar.service.auth.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final UserRepository userRepository;

    private UserDetails userDetails;

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> singupCustomer(@RequestBody SignupRequest signupRequest){
        if(authService.hasCustomerWithEmail(signupRequest.getEmail())){
            return new ResponseEntity<>("Customer already exist with this mail", HttpStatus.NOT_ACCEPTABLE);
        }
        UserDTO createdCustomerdto = authService.createCustomer(signupRequest);
        if(createdCustomerdto==null) {
            return new ResponseEntity<>("Customer not created",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdCustomerdto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthentication(@RequestBody AuthenticationRequest authenticationRequest)  {
       final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if(optionalUser.isPresent()){
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
        }
        return authenticationResponse;
    }
}
