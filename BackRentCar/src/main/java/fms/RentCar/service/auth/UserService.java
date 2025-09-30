package fms.RentCar.service.auth;


import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {


    UserDetailsService userDetailsService();
}
