export class CreateMessageDto {
    body: string;
    image: string;
    conversation: string; // แก้ชื่อฟิลด์ให้เป็น conversation แทน conversationId
    senderId: string;
  }