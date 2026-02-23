package fms.RentCar.controller;


import fms.RentCar.dto.AuthenticationRequest;
import fms.RentCar.dto.AuthenticationResponse;
import fms.RentCar.dto.SignupRequest;
import fms.RentCar.dto.UserDTO;
import fms.RentCar.entity.User;
import fms.RentCar.repository.UserRepository;
import fms.RentCar.service.auth.AuthService;
import fms.RentCar.service.auth.UserService;
import fms.RentCar.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    private final AuthenticationManager authenticationManager;

    private final AuthService authService;

    private final UserRepository userRepository;

    private UserDetails userDetails;

    private final UserService userService;

    private final JWTUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> singupCustomer(@RequestBody SignupRequest signupRequest){
        if(authService.hasCustomerWithEmail(signupRequest.getEmail())){
            return  ResponseEntity.status( HttpStatus.NOT_ACCEPTABLE).body(null);
        }
        UserDTO createdCustomerdto = authService.createCustomer(signupRequest);
        if(createdCustomerdto==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return new ResponseEntity<>(createdCustomerdto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthentication(@RequestBody AuthenticationRequest authenticationRequest)  {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password");
        }

       final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        if(optionalUser.isPresent()){
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
        }
        return authenticationResponse;
    }
}
