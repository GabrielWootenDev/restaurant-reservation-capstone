function sortReservations(reservations) {
    return reservations.sort(function(a,b){
        a = new Date(a.reservation_date+" "+a.reservation_time);
        b = new Date(b.reservation_date+" "+b.reservation_time);
        return a<b?-1:a>b?1:0;
   })
}

export default sortReservations;