import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:http/http.dart' as http;

class QrScannerPage extends StatefulWidget {
  const QrScannerPage({super.key});

  @override
  State<QrScannerPage> createState() => _QrScannerPageState();
}

class _QrScannerPageState extends State<QrScannerPage> {
  final MobileScannerController cameraController = MobileScannerController();
  String statusMessage = "Scan a QR to mark attendance";
  bool scanned = false;

  @override
  void initState() {
    super.initState();
    cameraController.start(); // Ensure camera starts automatically
  }

  @override
  void dispose() {
    cameraController.dispose();
    super.dispose();
  }

  Future<void> markAttendance(Map<String, dynamic> studentData) async {
    final url = Uri.parse("http://10.0.2.2:8000/student/rigister");

    try {
      final response = await http.post(
        url,
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(studentData),
      );

      if (!mounted) return;

      if (response.statusCode == 200) {
        setState(() {
          statusMessage = "✅ Attendance marked for ${studentData['name']}";
          scanned = true;
        });
        cameraController.stop();
      } else {
        setState(() {
          statusMessage = "❌ Error: ${response.body}";
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        statusMessage = "❌ Failed to connect to server";
      });
    }
  }

  void resetScanner() {
    setState(() {
      scanned = false;
      statusMessage = "Scan a QR to mark attendance";
    });
    cameraController.start();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Scan QR Attendance")),
      body: Column(
        children: [
          Expanded(
            flex: 2,
            child: MobileScanner(
              controller: cameraController,
              onDetect: (barcode) {
                if (scanned) return; // prevent multiple scans
                if (barcode.barcodes.isNotEmpty) {
                  final data = barcode.barcodes.first.rawValue ?? "";
                  try {
                    final qrjson = jsonDecode(data);
                    markAttendance(qrjson);
                  } catch (e) {
                    setState(() {
                      statusMessage = "❌ Invalid QR code format";
                    });
                  }
                }
              },
            ),
          ),
          Expanded(
            flex: 1,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    statusMessage,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 20),
                  if (scanned)
                    ElevatedButton(
                      onPressed: resetScanner,
                      child: const Text("Scan Again"),
                    ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
