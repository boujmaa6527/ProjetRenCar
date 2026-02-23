package fms.RentCar.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "reservation")
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startDate;
    private String endDate;

    @ManyToOne
    private User user;

    @ManyToOne
    private Car car;
}
