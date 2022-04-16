import { GROUPID } from "../utils/config";

class Cinema {
  cumRapChieu = [];
  logo = "";
  maHeThongRap = "";
  tenHeThongRap = "";
}

class Genres {
  id = 0;
  name = "";
}

class Cast {
  adult = false;
  cast_id = 0;
  character = "";
  credit_id = "";
  gender = 0;
  id = 0;
  known_for_department = "";
  name = "";
  order = 0;
  original_name = "";
  popularity = 0;
  profile_path = "";
}

export class MovieModel {
  backdrop_path = "";
  runtime = 0;
  vote_average = 0;
  genres = [new Genres()];
  poster_path = "";
  release_date = "";
  title = "";
  tagline = "";
  overview = "";
  showtime = [new Cinema()];
  trailer = "";
  titleUrl = "";
  idMovie = 0;
  id = 0;
  cast = [new Cast()];
}

export class PersonModel {
  adult = false;
  also_known_as = [];
  biography = "";
  birthday = "";
  deathday = "";
  gender = 0;
  homepage = "";
  id = 0;
  imdb_id = "";
  known_for_department = "";
  name = "";
  place_of_birth = "";
  popularity = 0;
  profile_path = "";
}

export class NewsModel {
  _id = 0;
  title = "";
  excerpt = "";
  titleUrl = "";
  imageUrl = "";
  published = "";
  popular = false;
  trending = false;
  body = "";
  __v = 0;
}

class SweetAlert {
  position = "center";
  icon = "success";
  title = "Successful";
  text = "";
  showConfirmButton = false;
  confirmButtonText = "Yes";
  confirmButtonColor = "var(--color-red)";
  showCancelButton = false;
  timer = 2000;
  timerProgressBar = false;
}
export class SweetAlertFailure extends SweetAlert {
  icon = "error";
  title = "Failure";
}
export class SweetAlertSuccessful extends SweetAlert {
  icon = "success";
  title = "Successful";
}

export class SweetAlertWarning extends SweetAlert {
  icon = "warning";
  title = "You must login to continue";
}

export class SweetAlertQuestion extends SweetAlert {
  icon = "question";
}

export class BookingModel {
  maLichChieu = 0;
  danhSachVe = [];
  taiKhoanNguoiDung = "";
}

export class UserModel {
  taiKhoan = "";
  email = "";
  soDt = "";
  hoTen = "";
  matKhau = "";
  maLoaiNguoiDung = "";
  maNhom = GROUPID;
}
