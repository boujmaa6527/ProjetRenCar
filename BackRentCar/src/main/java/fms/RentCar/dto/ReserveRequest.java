package fms.RentCar.dto;


import lombok.Data;

@Data
public class ReserveRequest {

    private String startDate;
    private String endDate;
}
