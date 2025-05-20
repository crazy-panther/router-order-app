package com.example.backend.service;

import com.example.backend.entity.OrderEntity;
import com.example.backend.repository.OrderRepository;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final OrderRepository orderRepository;
    private final ModelMapper mapper;

    public byte[] generateOrderReport() throws DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);
        document.open();

        // Title
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
        Paragraph title = new Paragraph("Order Report", font);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        table.setWidths(new int[]{2, 4, 4, 4, 2});

        Stream.of("Order ID", "Customer", "Item", "Qty","Status")
                .forEach(header -> {
                    PdfPCell cell = new PdfPCell(new Phrase(header));
                    cell.setBackgroundColor(Color.LIGHT_GRAY);
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);
                });

        for (OrderEntity entity : orderRepository.findAll()) {
            table.addCell(entity.getOrderId().toString());
//            table.addCell(entity.getCustomer().getCustomerName());
            table.addCell(entity.getOrderItem().getProductName());
            table.addCell(String.valueOf(entity.getOrderItem().getQuantity()));
            table.addCell(entity.getStatus().toString());
        }

        document.add(table);
        document.close();
        return out.toByteArray();
    }
}