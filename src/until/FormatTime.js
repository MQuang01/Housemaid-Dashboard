export const formatMinutesToHHMM = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
};
export const formatMinutesToDetail = (totalMinutes) => {
    // 185 => 2h 5 phút
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) {
        return `${minutes} phút`;
    }
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours} tiếng ${formattedMinutes} phút`;
}

export const formatHHMMSinceMidnightToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

export const parseTimeString = (timeString) =>{

    // Tách chuỗi thành giờ và phút
    const parts = timeString.split(":");

    // Chuyển đổi các phần tử từ chuỗi sang số nguyên
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    // Tạo đối tượng Date mới
    const parsedTime = new Date();

    parsedTime.setHours(hours);
    parsedTime.setMinutes(minutes);

    // Lấy giờ và phút từ đối tượng Date đã parse
    const parsedHours = parsedTime.getHours();
    const parsedMinutes = parsedTime.getMinutes();

    // Tạo chuỗi giờ và phút với định dạng "hh:mm"
    // console.log(parsedTime);
    return `${parsedHours}:${parsedMinutes < 10 ? '0' : ''}${parsedMinutes}`;
}

export const formatYYYYMMDDToDDMMYYYY = (date) =>{
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`
}

export const getTimeNow = () =>{
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`
}

export const parseStringToDate = (dateString) =>{
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}