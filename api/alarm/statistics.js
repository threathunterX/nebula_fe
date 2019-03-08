const data = [];
const time = 1473746400000;
for (let i = 0; i < 2209; i += 1) {
  data.push({
    production_count: parseInt(Math.random() * 10, 10),
    test_count: parseInt(Math.random() * 10, 10),
    time_frame: time + (i * 3600000)
  });
}

module.exports = data;
/*
 module.exports = [{"production_count": 0, "test_count": 0, "time_frame": 1463421600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463425200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463428800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463432400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463436000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463439600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463443200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463446800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463450400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463454000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463457600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463461200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463464800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463468400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463472000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463475600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463479200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463482800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463486400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463490000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463493600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463497200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463500800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463504400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463508000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463511600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463515200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463518800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463522400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463526000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463529600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463533200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463536800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463540400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463544000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463547600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463551200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463554800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463558400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463562000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463565600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463569200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463572800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463576400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463580000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463583600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463587200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463590800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463594400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463598000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463601600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463605200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463608800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463612400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463616000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463619600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463623200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463626800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463630400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463634000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463637600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463641200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463644800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463648400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463652000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463655600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463659200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463662800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463666400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463670000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463673600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463677200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463680800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463684400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463688000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463691600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463695200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463698800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463702400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463706000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463709600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463713200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463716800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463720400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463724000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463727600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463731200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463734800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463738400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463742000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463745600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463749200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463752800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463756400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463760000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463763600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463767200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463770800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463774400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463778000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463781600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463785200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463788800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463792400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463796000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463799600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463803200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463806800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463810400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463814000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463817600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463821200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463824800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463828400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463832000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463835600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463839200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463842800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463846400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463850000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463853600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463857200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463860800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463864400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463868000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463871600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463875200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463878800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463882400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463886000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463889600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463893200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463896800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463900400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463904000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463907600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463911200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463914800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463918400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463922000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463925600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463929200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463932800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463936400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463940000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463943600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463947200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463950800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463954400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463958000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463961600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463965200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463968800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463972400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463976000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463979600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463983200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463986800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463990400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1463994000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1463997600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464001200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464004800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464008400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464012000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464015600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464019200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464022800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464026400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464030000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464033600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464037200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464040800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464044400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464048000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464051600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464055200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464058800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464062400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464066000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464069600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464073200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464076800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464080400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464084000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464087600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464091200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464094800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464098400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464102000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464105600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464109200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464112800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464116400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464120000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464123600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464127200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464130800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464134400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464138000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464141600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464145200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464148800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464152400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464156000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464159600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464163200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464166800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464170400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464174000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464177600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464181200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464184800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464188400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464192000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464195600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464199200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464202800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464206400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464210000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464213600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464217200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464220800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464224400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464228000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464231600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464235200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464238800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464242400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464246000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464249600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464253200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464256800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464260400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464264000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464267600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464271200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464274800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464278400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464282000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464285600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464289200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464292800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464296400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464300000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464303600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464307200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464310800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464314400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464318000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464321600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464325200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464328800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464332400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464336000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464339600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464343200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464346800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464350400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464354000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464357600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464361200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464364800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464368400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464372000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464375600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464379200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464382800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464386400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464390000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464393600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464397200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464400800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464404400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464408000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464411600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464415200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464418800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464422400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464426000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464429600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464433200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464436800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464440400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464444000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464447600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464451200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464454800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464458400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464462000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464465600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464469200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464472800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464476400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464480000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464483600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464487200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464490800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464494400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464498000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464501600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464505200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464508800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464512400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464516000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464519600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464523200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464526800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464530400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464534000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464537600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464541200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464544800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464548400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464552000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464555600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464559200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464562800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464566400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464570000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464573600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464577200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464580800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464584400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464588000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464591600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464595200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464598800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464602400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464606000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464609600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464613200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464616800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464620400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464624000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464627600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464631200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464634800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464638400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464642000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464645600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464649200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464652800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464656400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464660000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464663600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464667200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464670800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464674400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464678000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464681600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464685200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464688800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464692400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464696000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464699600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464703200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464706800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464710400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464714000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464717600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464721200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464724800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464728400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464732000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464735600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464739200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464742800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464746400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464750000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464753600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464757200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464760800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464764400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464768000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464771600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464775200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464778800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464782400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464786000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464789600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464793200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464796800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464800400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464804000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464807600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464811200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464814800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464818400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464822000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464825600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464829200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464832800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464836400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464840000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464843600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464847200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464850800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464854400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464858000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464861600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464865200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464868800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464872400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464876000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464879600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464883200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464886800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464890400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464894000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464897600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464901200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464904800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464908400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464912000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464915600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464919200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464922800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464926400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464930000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464933600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464937200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464940800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464944400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464948000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464951600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464955200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464958800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464962400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464966000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464969600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464973200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464976800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464980400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464984000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464987600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464991200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1464994800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1464998400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465002000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465005600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465009200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465012800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465016400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465020000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465023600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465027200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465030800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465034400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465038000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465041600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465045200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465048800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465052400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465056000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465059600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465063200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465066800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465070400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465074000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465077600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465081200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465084800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465088400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465092000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465095600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465099200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465102800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465106400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465110000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465113600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465117200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465120800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465124400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465128000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465131600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465135200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465138800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465142400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465146000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465149600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465153200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465156800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465160400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465164000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465167600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465171200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465174800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465178400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465182000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465185600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465189200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465192800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465196400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465200000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465203600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465207200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465210800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465214400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465218000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465221600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465225200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465228800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465232400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465236000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465239600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465243200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465246800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465250400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465254000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465257600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465261200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465264800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465268400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465272000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465275600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465279200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465282800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465286400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465290000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465293600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465297200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465300800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465304400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465308000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465311600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465315200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465318800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465322400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465326000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465329600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465333200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465336800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465340400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465344000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465347600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465351200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465354800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465358400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465362000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465365600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465369200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465372800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465376400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465380000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465383600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465387200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465390800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465394400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465398000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465401600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465405200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465408800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465412400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465416000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465419600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465423200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465426800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465430400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465434000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465437600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465441200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465444800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465448400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465452000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465455600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465459200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465462800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465466400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465470000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465473600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465477200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465480800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465484400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465488000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465491600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465495200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465498800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465502400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465506000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465509600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465513200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465516800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465520400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465524000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465527600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465531200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465534800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465538400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465542000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465545600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465549200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465552800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465556400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465560000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465563600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465567200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465570800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465574400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465578000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465581600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465585200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465588800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465592400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465596000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465599600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465603200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465606800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465610400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465614000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465617600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465621200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465624800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465628400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465632000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465635600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465639200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465642800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465646400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465650000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465653600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465657200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465660800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465664400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465668000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465671600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465675200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465678800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465682400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465686000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465689600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465693200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465696800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465700400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465704000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465707600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465711200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465714800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465718400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465722000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465725600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465729200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465732800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465736400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465740000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465743600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465747200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465750800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465754400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465758000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465761600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465765200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465768800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465772400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465776000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465779600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465783200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465786800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465790400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465794000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465797600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465801200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465804800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465808400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465812000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465815600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465819200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465822800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465826400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465830000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465833600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465837200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465840800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465844400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465848000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465851600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465855200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465858800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465862400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465866000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465869600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465873200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465876800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465880400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465884000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465887600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465891200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465894800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465898400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465902000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465905600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465909200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465912800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465916400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465920000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465923600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465927200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465930800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465934400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465938000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465941600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465945200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465948800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465952400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465956000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465959600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465963200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465966800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465970400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465974000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465977600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465981200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465984800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465988400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465992000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1465995600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1465999200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466002800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466006400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466010000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466013600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466017200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466020800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466024400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466028000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466031600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466035200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466038800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466042400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466046000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466049600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466053200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466056800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466060400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466064000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466067600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466071200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466074800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466078400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466082000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466085600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466089200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466092800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466096400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466100000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466103600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466107200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466110800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466114400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466118000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466121600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466125200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466128800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466132400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466136000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466139600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466143200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466146800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466150400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466154000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466157600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466161200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466164800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466168400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466172000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466175600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466179200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466182800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466186400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466190000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466193600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466197200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466200800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466204400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466208000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466211600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466215200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466218800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466222400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466226000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466229600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466233200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466236800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466240400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466244000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466247600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466251200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466254800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466258400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466262000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466265600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466269200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466272800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466276400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466280000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466283600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466287200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466290800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466294400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466298000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466301600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466305200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466308800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466312400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466316000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466319600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466323200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466326800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466330400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466334000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466337600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466341200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466344800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466348400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466352000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466355600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466359200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466362800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466366400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466370000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466373600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466377200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466380800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466384400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466388000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466391600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466395200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466398800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466402400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466406000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466409600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466413200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466416800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466420400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466424000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466427600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466431200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466434800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466438400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466442000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466445600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466449200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466452800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466456400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466460000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466463600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466467200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466470800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466474400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466478000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466481600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466485200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466488800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466492400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466496000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466499600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466503200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466506800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466510400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466514000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466517600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466521200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466524800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466528400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466532000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466535600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466539200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466542800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466546400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466550000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466553600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466557200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466560800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466564400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466568000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466571600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466575200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466578800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466582400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466586000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466589600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466593200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466596800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466600400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466604000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466607600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466611200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466614800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466618400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466622000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466625600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466629200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466632800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466636400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466640000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466643600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466647200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466650800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466654400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466658000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466661600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466665200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466668800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466672400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466676000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466679600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466683200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466686800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466690400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466694000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466697600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466701200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466704800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466708400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466712000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466715600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466719200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466722800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466726400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466730000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466733600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466737200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466740800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466744400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466748000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466751600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466755200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466758800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466762400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466766000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466769600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466773200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466776800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466780400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466784000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466787600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466791200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466794800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466798400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466802000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466805600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466809200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466812800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466816400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466820000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466823600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466827200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466830800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466834400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466838000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466841600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466845200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466848800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466852400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466856000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466859600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466863200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466866800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466870400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466874000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466877600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466881200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466884800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466888400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466892000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466895600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466899200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466902800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466906400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466910000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466913600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466917200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466920800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466924400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466928000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466931600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466935200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466938800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466942400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466946000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466949600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466953200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466956800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466960400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466964000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466967600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466971200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466974800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466978400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466982000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466985600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466989200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1466992800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1466996400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467000000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467003600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467007200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467010800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467014400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467018000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467021600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467025200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467028800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467032400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467036000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467039600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467043200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467046800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467050400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467054000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467057600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467061200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467064800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467068400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467072000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467075600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467079200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467082800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467086400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467090000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467093600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467097200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467100800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467104400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467108000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467111600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467115200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467118800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467122400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467126000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467129600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467133200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467136800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467140400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467144000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467147600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467151200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467154800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467158400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467162000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467165600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467169200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467172800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467176400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467180000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467183600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467187200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467190800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467194400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467198000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467201600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467205200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467208800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467212400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467216000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467219600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467223200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467226800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467230400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467234000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467237600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467241200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467244800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467248400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467252000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467255600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467259200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467262800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467266400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467270000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467273600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467277200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467280800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467284400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467288000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467291600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467295200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467298800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467302400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467306000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467309600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467313200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467316800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467320400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467324000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467327600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467331200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467334800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467338400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467342000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467345600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467349200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467352800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467356400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467360000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467363600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467367200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467370800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467374400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467378000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467381600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467385200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467388800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467392400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467396000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467399600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467403200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467406800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467410400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467414000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467417600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467421200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467424800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467428400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467432000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467435600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467439200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467442800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467446400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467450000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467453600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467457200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467460800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467464400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467468000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467471600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467475200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467478800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467482400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467486000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467489600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467493200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467496800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467500400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467504000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467507600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467511200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467514800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467518400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467522000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467525600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467529200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467532800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467536400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467540000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467543600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467547200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467550800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467554400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467558000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467561600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467565200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467568800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467572400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467576000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467579600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467583200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467586800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467590400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467594000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467597600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467601200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467604800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467608400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467612000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467615600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467619200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467622800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467626400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467630000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467633600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467637200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467640800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467644400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467648000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467651600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467655200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467658800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467662400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467666000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467669600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467673200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467676800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467680400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467684000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467687600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467691200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467694800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467698400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467702000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467705600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467709200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467712800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467716400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467720000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467723600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467727200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467730800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467734400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467738000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467741600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467745200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467748800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467752400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467756000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467759600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467763200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467766800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467770400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467774000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467777600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467781200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467784800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467788400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467792000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467795600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467799200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467802800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467806400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467810000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467813600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467817200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467820800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467824400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467828000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467831600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467835200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467838800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467842400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467846000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467849600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467853200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467856800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467860400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467864000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467867600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467871200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467874800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467878400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467882000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467885600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467889200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467892800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467896400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467900000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467903600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467907200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467910800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467914400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467918000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467921600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467925200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467928800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467932400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467936000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467939600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467943200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467946800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467950400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467954000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467957600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467961200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467964800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467968400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467972000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467975600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467979200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467982800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467986400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467990000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1467993600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1467997200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468000800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468004400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468008000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468011600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468015200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468018800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468022400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468026000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468029600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468033200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468036800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468040400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468044000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468047600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468051200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468054800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468058400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468062000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468065600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468069200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468072800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468076400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468080000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468083600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468087200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468090800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468094400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468098000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468101600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468105200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468108800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468112400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468116000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468119600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468123200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468126800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468130400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468134000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468137600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468141200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468144800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468148400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468152000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468155600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468159200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468162800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468166400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468170000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468173600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468177200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468180800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468184400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468188000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468191600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468195200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468198800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468202400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468206000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468209600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468213200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468216800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468220400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468224000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468227600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468231200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468234800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468238400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468242000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468245600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468249200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468252800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468256400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468260000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468263600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468267200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468270800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468274400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468278000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468281600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468285200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468288800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468292400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468296000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468299600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468303200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468306800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468310400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468314000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468317600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468321200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468324800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468328400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468332000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468335600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468339200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468342800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468346400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468350000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468353600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468357200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468360800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468364400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468368000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468371600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468375200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468378800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468382400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468386000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468389600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468393200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468396800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468400400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468404000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468407600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468411200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468414800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468418400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468422000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468425600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468429200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468432800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468436400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468440000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468443600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468447200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468450800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468454400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468458000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468461600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468465200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468468800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468472400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468476000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468479600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468483200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468486800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468490400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468494000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468497600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468501200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468504800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468508400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468512000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468515600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468519200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468522800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468526400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468530000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468533600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468537200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468540800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468544400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468548000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468551600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468555200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468558800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468562400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468566000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468569600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468573200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468576800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468580400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468584000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468587600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468591200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468594800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468598400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468602000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468605600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468609200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468612800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468616400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468620000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468623600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468627200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468630800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468634400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468638000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468641600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468645200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468648800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468652400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468656000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468659600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468663200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468666800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468670400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468674000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468677600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468681200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468684800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468688400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468692000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468695600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468699200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468702800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468706400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468710000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468713600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468717200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468720800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468724400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468728000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468731600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468735200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468738800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468742400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468746000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468749600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468753200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468756800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468760400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468764000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468767600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468771200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468774800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468778400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468782000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468785600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468789200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468792800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468796400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468800000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468803600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468807200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468810800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468814400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468818000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468821600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468825200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468828800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468832400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468836000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468839600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468843200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468846800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468850400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468854000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468857600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468861200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468864800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468868400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468872000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468875600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468879200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468882800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468886400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468890000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468893600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468897200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468900800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468904400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468908000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468911600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468915200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468918800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468922400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468926000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468929600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468933200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468936800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468940400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468944000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468947600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468951200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468954800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468958400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468962000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468965600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468969200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468972800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468976400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468980000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468983600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468987200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468990800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1468994400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1468998000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469001600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469005200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469008800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469012400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469016000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469019600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469023200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469026800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469030400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469034000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469037600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469041200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469044800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469048400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469052000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469055600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469059200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469062800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469066400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469070000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469073600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469077200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469080800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469084400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469088000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469091600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469095200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469098800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469102400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469106000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469109600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469113200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469116800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469120400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469124000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469127600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469131200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469134800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469138400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469142000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469145600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469149200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469152800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469156400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469160000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469163600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469167200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469170800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469174400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469178000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469181600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469185200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469188800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469192400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469196000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469199600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469203200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469206800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469210400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469214000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469217600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469221200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469224800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469228400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469232000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469235600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469239200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469242800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469246400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469250000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469253600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469257200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469260800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469264400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469268000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469271600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469275200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469278800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469282400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469286000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469289600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469293200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469296800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469300400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469304000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469307600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469311200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469314800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469318400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469322000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469325600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469329200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469332800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469336400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469340000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469343600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469347200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469350800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469354400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469358000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469361600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469365200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469368800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469372400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469376000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469379600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469383200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469386800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469390400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469394000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469397600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469401200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469404800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469408400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469412000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469415600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469419200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469422800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469426400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469430000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469433600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469437200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469440800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469444400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469448000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469451600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469455200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469458800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469462400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469466000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469469600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469473200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469476800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469480400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469484000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469487600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469491200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469494800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469498400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469502000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469505600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469509200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469512800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469516400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469520000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469523600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469527200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469530800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469534400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469538000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469541600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469545200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469548800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469552400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469556000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469559600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469563200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469566800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469570400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469574000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469577600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469581200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469584800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469588400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469592000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469595600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469599200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469602800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469606400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469610000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469613600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469617200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469620800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469624400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469628000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469631600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469635200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469638800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469642400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469646000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469649600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469653200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469656800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469660400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469664000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469667600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469671200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469674800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469678400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469682000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469685600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469689200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469692800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469696400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469700000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469703600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469707200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469710800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469714400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469718000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469721600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469725200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469728800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469732400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469736000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469739600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469743200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469746800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469750400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469754000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469757600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469761200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469764800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469768400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469772000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469775600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469779200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469782800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469786400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469790000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469793600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469797200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469800800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469804400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469808000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469811600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469815200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469818800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469822400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469826000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469829600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469833200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469836800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469840400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469844000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469847600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469851200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469854800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469858400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469862000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469865600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469869200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469872800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469876400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469880000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469883600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469887200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469890800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469894400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469898000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469901600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469905200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469908800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469912400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469916000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469919600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469923200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469926800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469930400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469934000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469937600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469941200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469944800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469948400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469952000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469955600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469959200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469962800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469966400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469970000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469973600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469977200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469980800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469984400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469988000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469991600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1469995200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1469998800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470002400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470006000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470009600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470013200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470016800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470020400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470024000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470027600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470031200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470034800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470038400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470042000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470045600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470049200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470052800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470056400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470060000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470063600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470067200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470070800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470074400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470078000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470081600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470085200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470088800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470092400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470096000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470099600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470103200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470106800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470110400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470114000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470117600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470121200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470124800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470128400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470132000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470135600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470139200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470142800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470146400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470150000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470153600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470157200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470160800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470164400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470168000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470171600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470175200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470178800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470182400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470186000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470189600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470193200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470196800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470200400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470204000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470207600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470211200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470214800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470218400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470222000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470225600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470229200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470232800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470236400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470240000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470243600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470247200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470250800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470254400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470258000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470261600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470265200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470268800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470272400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470276000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470279600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470283200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470286800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470290400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470294000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470297600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470301200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470304800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470308400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470312000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470315600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470319200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470322800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470326400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470330000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470333600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470337200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470340800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470344400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470348000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470351600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470355200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470358800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470362400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470366000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470369600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470373200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470376800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470380400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470384000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470387600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470391200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470394800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470398400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470402000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470405600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470409200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470412800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470416400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470420000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470423600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470427200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470430800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470434400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470438000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470441600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470445200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470448800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470452400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470456000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470459600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470463200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470466800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470470400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470474000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470477600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470481200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470484800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470488400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470492000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470495600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470499200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470502800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470506400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470510000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470513600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470517200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470520800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470524400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470528000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470531600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470535200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470538800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470542400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470546000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470549600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470553200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470556800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470560400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470564000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470567600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470571200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470574800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470578400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470582000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470585600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470589200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470592800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470596400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470600000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470603600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470607200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470610800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470614400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470618000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470621600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470625200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470628800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470632400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470636000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470639600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470643200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470646800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470650400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470654000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470657600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470661200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470664800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470668400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470672000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470675600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470679200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470682800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470686400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470690000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470693600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470697200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470700800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470704400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470708000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470711600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470715200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470718800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470722400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470726000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470729600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470733200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470736800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470740400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470744000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470747600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470751200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470754800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470758400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470762000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470765600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470769200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470772800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470776400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470780000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470783600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470787200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470790800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470794400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470798000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470801600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470805200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470808800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470812400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470816000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470819600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470823200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470826800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470830400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470834000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470837600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470841200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470844800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470848400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470852000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470855600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470859200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470862800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470866400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470870000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470873600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470877200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470880800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470884400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470888000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470891600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470895200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470898800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470902400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470906000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470909600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470913200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470916800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470920400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470924000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470927600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470931200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470934800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470938400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470942000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470945600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470949200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470952800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470956400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470960000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470963600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470967200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470970800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470974400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470978000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470981600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470985200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470988800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470992400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1470996000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1470999600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471003200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471006800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471010400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471014000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471017600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471021200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471024800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471028400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471032000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471035600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471039200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471042800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471046400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471050000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471053600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471057200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471060800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471064400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471068000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471071600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471075200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471078800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471082400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471086000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471089600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471093200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471096800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471100400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471104000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471107600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471111200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471114800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471118400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471122000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471125600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471129200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471132800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471136400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471140000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471143600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471147200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471150800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471154400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471158000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471161600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471165200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471168800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471172400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471176000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471179600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471183200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471186800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471190400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471194000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471197600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471201200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471204800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471208400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471212000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471215600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471219200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471222800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471226400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471230000000
 }, {"production_count": 5, "test_count": 0, "time_frame": 1471233600000}, {
 "production_count": 52,
 "test_count": 0,
 "time_frame": 1471237200000
 }, {"production_count": 16, "test_count": 0, "time_frame": 1471240800000}, {
 "production_count": 85,
 "test_count": 0,
 "time_frame": 1471244400000
 }, {"production_count": 26, "test_count": 0, "time_frame": 1471248000000}, {
 "production_count": 3,
 "test_count": 0,
 "time_frame": 1471251600000
 }, {"production_count": 2, "test_count": 0, "time_frame": 1471255200000}, {
 "production_count": 5,
 "test_count": 0,
 "time_frame": 1471258800000
 }, {"production_count": 1, "test_count": 0, "time_frame": 1471262400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471266000000
 }, {"production_count": 1, "test_count": 0, "time_frame": 1471269600000}, {
 "production_count": 3,
 "test_count": 0,
 "time_frame": 1471273200000
 }, {"production_count": 7, "test_count": 0, "time_frame": 1471276800000}, {
 "production_count": 3,
 "test_count": 0,
 "time_frame": 1471280400000
 }, {"production_count": 13, "test_count": 0, "time_frame": 1471284000000}, {
 "production_count": 2,
 "test_count": 0,
 "time_frame": 1471287600000
 }, {"production_count": 1, "test_count": 0, "time_frame": 1471291200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471294800000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471298400000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471302000000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471305600000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471309200000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471312800000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471316400000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471320000000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471323600000
 }, {"production_count": 0, "test_count": 0, "time_frame": 1471327200000}, {
 "production_count": 0,
 "test_count": 0,
 "time_frame": 1471330800000
 }, {"production_count": 1, "test_count": 4703, "time_frame": 1471334400000}, {
 "production_count": 8,
 "test_count": 20544,
 "time_frame": 1471338000000
 }, {"production_count": 6, "test_count": 21246, "time_frame": 1471341600000}, {
 "production_count": 2,
 "test_count": 19522,
 "time_frame": 1471345200000
 }, {"production_count": 3, "test_count": 20815, "time_frame": 1471348800000}, {
 "production_count": 3,
 "test_count": 21272,
 "time_frame": 1471352400000
 }, {"production_count": 4, "test_count": 20537, "time_frame": 1471356000000}, {
 "production_count": 3,
 "test_count": 19851,
 "time_frame": 1471359600000
 }, {"production_count": 1, "test_count": 19697, "time_frame": 1471363200000}, {
 "production_count": 16,
 "test_count": 18929,
 "time_frame": 1471366800000
 }, {"production_count": 0, "test_count": 552, "time_frame": 1471370400000}];

 */
