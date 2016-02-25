# Flight Summary Console App

Console application which creates a flight summary based on route, aircraft, and passenger data. 

### Input
The input should contain the route, aircraft, and passenger data. Described below in [ABNF](https://en.wikipedia.org/wiki/Augmented_Backus%E2%80%93Naur_Form).

```
instruction-line = add-route CRLF add-aircraft CRLF 1*add-passenger

add-route = "add route" SP origin SP destination SP cost-per-passenger SP ticket-price SP minimum-takeoff-load-percentage
add-aircraft = "add aircraft" SP aircraft-title SP number-of-seats
add-passenger = "add" SP (general-passenger / airline-passenger / loyalty-passenger) CRLF

general-passenger = "general" SP first-name SP age
airline-passenger = "airline" SP first-name SP age
loyalty-passenger = "loyalty" SP first-name SP age SP current-loyalty-points SP using-loyalty-points SP using-extra-baggage

origin = identifier                           ; the name of the origin city
destination = identifier                      ; the name of the destination city
cost-per-passenger = numeric                  ; the cost to the airline per passenger of flying
                                              ; the route in whole £
ticket-price = numeric                        ; the price of the ticket in whole £
minimum-takeoff-load-percentage = percentage  ; the minimum percentage of the plane's capacity
                                              ; that must be used for the route to be able to
                                              ; fly

aircraft-title = identifier                   ; the name of the plane
number-of-seats = numeric                     ; the total number of seats on the plane

first-name = identifier                       ; the first name of the passenger
age = numeric                                 ; the age of the passenger in years

current-loyalty-points = numeric              ; the number of loyalty points the customer
                                              ; currently has, before embarking on the
                                              ; current flight
using-loyalty-point = boolean                 ; whether or not the passenger is using
                                              ; loyalty points to pay for the flight
                                              ; if the number of loyalty points is less
                                              ; than the ticket cost then the customer
                                              ; pays the remainder
using-extra-baggage = boolean                 ; whether or not the passenger is bringing
                                              ; an extra bag

percentage = %d0-100
identifier = 1*ALPHA
numeric = 1*DIGIT
boolean = "TRUE" / "FALSE"
```

### Output
The output will contain the flight summary. Described below in ABNF.
 
```
output-line = total-passenger-count SP
              general-passenger-count SP
              airline-passenger-count SP
              loyalty-passenger-count SP
              total-number-of-bags SP
              total-loyalty-points-redeemed SP
              total-cost-of-flight SP
              total-unadjusted-ticket-revenue SP
              total-adjusted-revenue SP
              can-flight-proceed

total-passenger-count = numeric           ; total number of passengers on the flight
general-passenger-count = numeric         ; number of general passengers on the flight
airline-passenger-count = numeric         ; number of airline passengers on the flight
loyalty-passenger-count numeric           ; number of loyalty passengers on the flight
total-number-of-bags = numeric            ; the total number of bags on the plane
total-loyalty-points-redeemed = numeric   ; the total number of loyalty points redeemed by
                                          ; all passengers
total-cost-of-flight = numeric            ; the total cost to the airline of running the flight
total-unadjusted-ticket-revenue = numeric ; the total ticket revenue, ignoring loyalty
                                          ; and airline passenger adjustments
total-adjusted-revenue = numeric          ; the total ticket revenue, after adjusting for
                                          ; loyalty members points and airline passengers
can-flight-proceed = boolean              ; can the flight proceed, according to the rules
                                          ; defined below

numeric = ["-"] 1*DIGIT
boolean = "TRUE" / "FALSE"
```

###  Flight rules

A flight proceeds only if all of the following rules are met:

1. The total adjusted revenue for the flight exceeds the total cost of the flight.
2. The number of passengers does not exceed the number of seats on the plane.
3. The percentage of booked seats exceeds the minimum set for the route.