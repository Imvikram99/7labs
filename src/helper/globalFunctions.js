export const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
}

export function getDate(type) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var minutes = today.getMinutes();
    var hour = today.getHours();


    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
   if(type == "time"){
     return hour + ':' + minutes
   }
   return  today;
}