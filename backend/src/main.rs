use std::{
    fs::{self, File},
    path::Path,
};

use actix_cors::Cors;
use actix_files::Files;
use actix_web::{middleware::Logger, web, App, HttpRequest, HttpServer};
use build_timestamp::build_time;
use chrono::{FixedOffset, Utc};
use log::LevelFilter;
use simplelog::{
    ColorChoice, CombinedLogger, ConfigBuilder, SharedLogger, TermLogger, TerminalMode, WriteLogger,
};

mod quiz;
mod sample_ws;

build_time!("%A %Y-%m-%d / %H:%M:%S");

async fn index(req: HttpRequest) -> &'static str {
    println!("REQ: {:?}", req);
    println!("built on: {}", BUILD_TIME);
    BUILD_TIME
}

fn init_logger(log_path: Option<&str>) {
    let jst_now = {
        let jst = Utc::now();
        jst.with_timezone(&FixedOffset::east(9 * 3600))
    };
    let mut logger: Vec<Box<dyn SharedLogger>> = vec![
        #[cfg(not(feature = "termcolor"))]
        TermLogger::new(
            if cfg!(debug_assertions) {
                LevelFilter::Debug
            } else {
                LevelFilter::Info
            },
            ConfigBuilder::new().set_time_to_local(true).build(),
            TerminalMode::Mixed,
            ColorChoice::Auto,
        ),
    ];
    if let Some(log_path) = log_path {
        let log_path = Path::new(log_path);
        fs::create_dir_all(&log_path).unwrap();
        logger.push(WriteLogger::new(
            LevelFilter::Warn,
            ConfigBuilder::new().set_time_to_local(true).build(),
            File::create(log_path.join(format!("{}.log", jst_now))).unwrap(),
        ));
    }
    CombinedLogger::init(logger).unwrap()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // init_logger(Some(&Path::new("./log")));
    init_logger(None);

    std::env::set_var("RUST_LOG", "actix_web=info");

    HttpServer::new(|| {
        App::new()
            .wrap(if cfg!(debug_assertions) {
                Cors::permissive()
            } else {
                Cors::default()
                    .allowed_origin("All")
                    .send_wildcard()
                    .max_age(3600)
            })
            .wrap(Logger::default())
            .service(web::resource("/").to(index))
            .service(quiz::quiz)
            .service(Files::new("/static", "./backend/static/").index_file("index.html"))
    })
    .bind(("0.0.0.0", 3000))?
    .run()
    .await
}
