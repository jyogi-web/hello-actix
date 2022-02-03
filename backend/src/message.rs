use actix::prelude::*;

use crate::room::QuizRoom;

#[derive(Clone, Message)]
#[rtype(result = "()")]
pub(crate) struct WsMessage(pub String);

#[derive(Clone, Message)]
#[rtype(result = "usize")]
pub(crate) struct JoinRoom {
    pub name: Option<String>,
    pub addr: Recipient<WsMessage>,
}

#[derive(Clone, Message)]
#[rtype(result = "Addr<QuizRoom>")]
pub(crate) struct GetRoom {
    pub room_name: String,
}
